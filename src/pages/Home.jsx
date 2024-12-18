
import { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { Header } from "../components/home/header";
import { HappyHighlights } from "../components/home/HappyHighlights";
import { TopRatedProducts } from "../components/home/TopRatedProducts";
import { Fetch } from "../services/Fetch";


export const Home = () => {
  const {  setAllProducts } = useGlobalContext();





  
  const { data } = Fetch("allProducts");

  useEffect(() => {
    if (data && data.products) {
      setAllProducts(data.products);
    }
  }, [data]);



  return (
    <>
  
<Header />

<section className="dottedBorder">           
     <HappyHighlights />

     </section>


<TopRatedProducts  />







    </>
  )
}
