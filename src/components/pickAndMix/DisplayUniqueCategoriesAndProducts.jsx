
import { ProductCard } from '../productCard/ProductCard';
import { PickAndMixCategoryTitels } from './pickAndMixCategoryTitels';
import { useProductContext } from '../../context/ProductContext';
import { useGlobalContext } from '../../context/GlobalContext';

export const DisplayUniqueCategoriesAndProducts = ({setNewUrl}) => {
 const { pickAndmixProducts } = useProductContext()
  const { userId } = useGlobalContext();
  const limit = 30;
  const pickAndMix = true;


/* background after category names */
    const categoryBackgrounds = {
        "face cream": "https://i.ibb.co/dfSJHFH/Product2.png",
        "serum": "https://i.ibb.co/sRxRDnJ/Product1.png",
        "face mask": "https://i.ibb.co/dfSJHFH/Product2.png",
    
    
      };



     // Extract unique categories from the mixList only once
  const uniqueCategories = [...new Set(pickAndmixProducts.map(product => product.category))];



  return (

<section className='pickAndMixProducts'>       
        {uniqueCategories.map(category => {
          // Filter products for the current category
          const filteredProducts = pickAndmixProducts.filter(item => item.category === category);

          // If there are no products in this category, skip rendering this category
          if (filteredProducts.length === 0) {
            return null; // You can also show a message or image for empty categories here
          }
           /* if category name dont match any background titels use default image*/
          const backgroundUrl = categoryBackgrounds[category] || "https://i.ibb.co/dfSJHFH/Product2.png";

          return (
            <section key={category} className="pickAndMix">

                {/* Titel component */}
              <PickAndMixCategoryTitels titel={category} background={backgroundUrl} />

              <section className={filteredProducts.length >= 3 ? "ProductCard___container pickAndMix___grid" : "ProductCard___container pickAndMix___smallGrid"} >
                {/* Map products - productCard */}
                {filteredProducts.map(item => {
                  return (
                    <ProductCard
                      key={`${item._id}-${item.averageRating}`}
                      item={item}
                      userId={userId}
                      setUrl={setNewUrl}
                      limit={limit}
                      pickAndMix={pickAndMix}

                    />
                  );
                })}


              </section>
            </section>
          );
        })}
        </section>
  )
}
