import { useEffect } from "react";

import { Header } from "../components/home/header";
import { HappyHighlights } from "../components/home/HappyHighlights";
import { TopRatedProducts } from "../components/home/TopRatedProducts";
import { Fetch } from "../services/Fetch";
import { useProductContext } from "../context/ProductContext";
import { UseCheckLoginStatus } from "../services/UseCheckLoginStatus";




export const Home = () => {
  const {

    allProductsList,
    setAllProductsList
  } = useProductContext();



  /* Check if user have a valid userId && token, if true => get cart */
  UseCheckLoginStatus()






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
