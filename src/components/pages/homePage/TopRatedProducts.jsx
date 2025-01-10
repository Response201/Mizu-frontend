import { useEffect, useState } from "react";
import { ProductCard } from "../../common/productCard/ProductCard";
import { useGlobalContext } from "../../../context/GlobalContext";
import { Fetch } from "../../../services/Fetch";
import { useProductContext } from "../../../context/ProductContext";
import { useCartContext } from "../../../context/CartContext";

export const TopRatedProducts = () => {
    const { userId} = useGlobalContext();
 
    const {  topRatedProducts, setTopRatedProducts, setBeforeFilteringProducts,
      setTotalPages } = useProductContext();
    const {cart, setIsProcessing} = useCartContext()
  const [url, setUrl] = useState("sortProducts?limit=3&search=&sort=averageRating:desc");
  const { data } = Fetch(url);





  useEffect(() => {
    if (data && data.products) {
      setTopRatedProducts([...data.products]);
      setUrl("");
      setIsProcessing(false)
    }
  }, [data, setTopRatedProducts, setIsProcessing]);




  useEffect(() => {
  
      setUrl("sortProducts?limit=3&search=&sort=averageRating:desc"); 
      
  }, [cart]);






 // Fetch for "beforeFilteringProducts" used in "product-page"
  const { data: topRatedData } = Fetch(
    "sortProducts?limit=9&search=&sort=averageRating:desc, price:desc&category=all"
  );

  useEffect(() => {
    if (topRatedData && topRatedData.products) {
      setBeforeFilteringProducts(topRatedData.products);
      setTotalPages(Math.ceil(topRatedData.total / topRatedData.limit));
    }
  }, [topRatedData, setBeforeFilteringProducts, setTotalPages]);


  return (
    <>


      {topRatedProducts.length > 0 && (
        <article className="topRatedProductsContainer">
          <section className="topRatedProductsContainer___text">
            <h2>TOP RATED</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto assumenda, magnam,
              voluptates. Ipsum cumque, si sint!
            </p>
          </section>

          <section className="ProductCard___container">
            {topRatedProducts.map((item) => (
              <ProductCard
                key={`${item._id}-${item.averageRating}`}
                item={item}
                userId={userId}
                setUrl={setUrl}
               
              />
            ))}
          </section>
        </article>
      )}
    </>
  );
};
