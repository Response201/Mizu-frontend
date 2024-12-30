import { useEffect, useState } from "react";
import { ProductCard } from "../productCard/ProductCard";
import { useGlobalContext } from "../../context/GlobalContext";
import { Fetch } from "../../services/Fetch";
import { useProductContext } from "../../context/ProductContext";
import { useCartContext } from "../../context/CartContext";

export const TopRatedProducts = () => {
    const { userId} = useGlobalContext();
    const {  topRatedProducts, setTopRatedProducts } = useProductContext();
    const {cart} = useCartContext()
  const [url, setUrl] = useState("sortProducts?limit=3&search=&sort=averageRating:desc,price:asc");
  const { data } = Fetch(url);





  useEffect(() => {
    if (data && data.products) {
      setTopRatedProducts([...data.products]);
      setUrl("");
   
    }
  }, [data, setTopRatedProducts]);




  useEffect(() => {
  
      setUrl("sortProducts?limit=3&search=&sort=averageRating:desc,price:asc"); 
      
  }, [ cart]);






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
