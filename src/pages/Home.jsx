import { useEffect } from "react";
import { Fetch } from "../services/Fetch";
import { useProductContext } from "../context/ProductContext";
import { Header } from "../components/pages/homePage/Header";
import { HappyHighlights } from "../components/pages/homePage/HappyHighlights";
import { TopRatedProducts } from "../components/pages/homePage/TopRatedProducts";




export const Home = () => {
  const {allProductsList,setAllProductsList} = useProductContext();


  // Fetch för "allProductsList" used to check stock value(cart && TabelListProducts => CartAndTableBtns)
  const { data: allProductsData } = Fetch("allProducts");

  useEffect(() => {
    if (allProductsData && allProductsData.products && !allProductsList) {
      setAllProductsList(allProductsData.products);
    }
  }, [allProductsData, allProductsList, setAllProductsList]);



  return (
    <>
      <Header />
      <section className="dottedBorder">
        <HappyHighlights />
      </section>
      <TopRatedProducts />
    </>
  );
};
