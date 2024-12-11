
import { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useFetch } from "../services/useFetch";
import { ProductCard } from "../components/productCard";

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

      <h1>
        Home

      </h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam aspernatur quae ipsa animi deleniti nulla molestiae ea eaque dolorum, ut esse non enim quidem, error mollitia quas suscipit dolore voluptatem!</p>


<section className="ProductCard___container">
{allProducts && allProducts.map((item, index) => (
   <ProductCard key={index} item={item} />
      ))}


</section>




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
