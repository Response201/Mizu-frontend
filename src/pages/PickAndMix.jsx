import { useEffect, useState } from "react";
import { ProductCard } from "../components/productCard/ProductCard";
import { useGlobalContext } from "../context/GlobalContext";
import { Fetch } from "../services/Fetch";

import { useProductContext } from "../context/ProductContext";
import noProductsImg from "../assets/images/no-products-found.png";
import { useCartContext } from "../context/CartContext";
import { UseCheckLoginStatus } from "../services/UseCheckLoginStatus";





export const PickAndMix = () => {
  const { userId } = useGlobalContext();
  const {pickAndmixProducts, setPickAndmixProducts} = useProductContext()
  const limit = 30;
  const { cart } = useCartContext();
  const pickAndMix = true;
  const [url, setUrl] = useState("sortProducts?pickAndMix=true");
  const [newUrl, setNewUrl] = useState("");
  const { data } = Fetch(url || newUrl);


  const categoryBackgrounds = {
    "face cream": "https://i.ibb.co/dfSJHFH/Product2.png",
    "serum": "https://i.ibb.co/sRxRDnJ/Product1.png",
    "face mask": "https://i.ibb.co/dfSJHFH/Product2.png",
   
  
  };



  // Check if user is logged in and has valid token
  UseCheckLoginStatus();

  useEffect(() => {
    if (data && data.products) {
      setPickAndmixProducts(data.products);
      setUrl(""); 
      setNewUrl(""); 
    }
  }, [data]);

  useEffect(() => {
    setUrl(`sortProducts?pickAndMix=true`);
  }, [cart]);

  // Extract unique categories from the mixList only once
  const uniqueCategories = [...new Set(pickAndmixProducts.map(product => product.category))];

  return (
    <article className="pickAndMixContainer" >
      <section className="pickAndMixContent">
        {uniqueCategories.map(category => {
          // Filter products for the current category
          const filteredProducts = pickAndmixProducts.filter(item => item.category === category);

          // If there are no products in this category, skip rendering this category
          if (filteredProducts.length === 0) {
            return null; // You can also show a message or image for empty categories here
          }

          const backgroundUrl = categoryBackgrounds[category] || "https://i.ibb.co/dfSJHFH/Product2.png"; 

          return (
            <section key={category} className="pickAndMix">
              <section className="pickAndMix___pickAndMixHeader">
              
              <img src={backgroundUrl} alt={`background`} />
                <h2>{category}</h2>
              </section>
              <section
                className={filteredProducts.length >= 3 ? "ProductCard___container pickAndMix___grid" : "ProductCard___container pickAndMix___smallGrid"}
              >
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

{pickAndmixProducts <= 0 &&     <section className="pickAndMixContent___noProductsFound">

          <img src={noProductsImg} alt="No products found" />

        </section> }

      </section>
    </article>
  );
};
