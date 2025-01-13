

import PickAndMixCategoryTitels from './PickAndMixCategoryTitels';
import { ProductCard } from '../../common/productCard/ProductCard';
import { useProductContext } from '../../../context/ProductContext';
import { useGlobalContext } from '../../../context/GlobalContext';


export const DisplayUniqueCategoriesAndProducts = ({ setNewUrl }) => {
  const { pickAndmixProducts } = useProductContext()
  const { userId } = useGlobalContext();
  const limit = 30;
  const pickAndMix = true;


  // Background images associated with specific categories
  const categoryBackgrounds = {
    "face cream": "https://cdn.discordapp.com/attachments/1053759995776352326/1328118066978099351/jsfrulle_turquoise_green__tiny_flowers_background_organic_feel__c5606540-ecee-4a95-af29-1bbfa964e809.png?ex=678589d6&is=67843856&hm=c58fc19766740c3f281b441e816154b6c6be8f40ff51f64aa206f748b89f9317&",
    "serum": "https://i.ibb.co/sRxRDnJ/Product1.png",
    "face mask": "https://cdn.discordapp.com/attachments/1053759995776352326/1328122990088552458/jsfrulle_green__tiny_flowers_background_organic_feel_white_back_a28da43f-a1cc-4306-b899-6eb1b978fde9.png?ex=67858e6c&is=67843cec&hm=b6f320bdd1b6d4770565426bc5223e7a3c572cc129db9411d7f74a2df34bfff9&",


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
