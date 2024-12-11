
import { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useFetch } from "../services/useFetch";

export const Home = () => {
  const { allProducts, setAllProducts } = useGlobalContext();

  const { data } = useFetch("allProducts");

  useEffect(() => {
    if (data && data.products) {
      setAllProducts(data.products);
    }
  }, [data]);



  return (
    <div>

      <h1>
        Home

      </h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam aspernatur quae ipsa animi deleniti nulla molestiae ea eaque dolorum, ut esse non enim quidem, error mollitia quas suscipit dolore voluptatem!</p>


      {allProducts && allProducts.map((item, index) => (
        <section key={index} className="hover-target">
          <p >

            {item.name}
          </p>

        </section>
      ))}



    </div>
  )
}
