
import { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useFetch } from "../services/useFetch";
import { ProductCard } from "../components/productCard";
import { Header } from "../components/home/header";
import { HappyHighlights } from "../components/home/HappyHighlights";

export const Home = () => {
  const { allProducts, setAllProducts } = useGlobalContext();

  const { data } = useFetch("allProducts");

  useEffect(() => {
    if (data && data.products) {
      setAllProducts(data.products);
    }
  }, [data]);



  return (
    <>
  
<Header />


     <HappyHighlights />


{allProducts.length >= 1  &&
<section className="ProductCard___container">
{allProducts.map((item, index) => (
   <ProductCard key={index} item={item} />
      ))}


</section>


}

      {/* {allProducts && allProducts.map((item, index) => (
        <section key={index} className="hover-target card"  style={{ '--card-primaryColor': item.primaryColor }}>
          <p   
      >

            {item.name}
          </p>




        </section>
      ))} */}



    </>
  )
}
