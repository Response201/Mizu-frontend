

import PickAndMixCategoryTitels from './PickAndMixCategoryTitels';
import { ProductCard } from '../../common/productCard/ProductCard';
import { useProductContext } from '../../../context/ProductContext';
import { useGlobalContext } from '../../../context/GlobalContext';

import imageOne from "../../../assets/images/v3.png"
import imageTwo from "../../../assets/images/v2.png"

export const DisplayUniqueCategoriesAndProducts = ({ setNewUrl }) => {
  const { pickAndmixProducts } = useProductContext()
  const { userId } = useGlobalContext();
  const limit = 30;
  const pickAndMix = true;


  // Background images associated with specific categories
  const categoryBackgrounds = {
    "face cream":imageOne,
    "serum": "https://i.ibb.co/sRxRDnJ/Product1.png",
    "face mask": imageTwo,


  };
  
  
  


  // Extract unique categories from the list pickAndmixProducts
  const uniqueCategories = [...new Set(pickAndmixProducts.map(product => product.category))].sort();



  return (

    <section className='pickAndMixProducts'>
      {uniqueCategories.map(category => {
        // Filter products for the current category
        const filteredProducts = pickAndmixProducts.filter(item => item.category === category);

        // Skip rendering this category if there are no products
        if (filteredProducts.length === 0) {
          return null;
        }


        // Assign a background image to the category, using a default if none is provided
        const backgroundUrl = categoryBackgrounds[category] || "https://i.ibb.co/dfSJHFH/Product2.png";




        return (
          <section key={category} className="pickAndMix">

            {/* Render the category title with the background image */}
            <PickAndMixCategoryTitels titel={category} background={backgroundUrl} />

            <section className={filteredProducts.length >= 3 ? "ProductCard___container pickAndMix___grid" : "ProductCard___container pickAndMix___smallGrid"} >
              {/* map filtered products and render a ProductCard for each */}
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
