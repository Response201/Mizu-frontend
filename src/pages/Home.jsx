import { useEffect } from "react";
import { Fetch } from "../services/Fetch";
import { useProductContext } from "../context/ProductContext";
import { Header } from "../components/pages/homePage/Header";
import { HappyHighlights } from "../components/pages/homePage/HappyHighlights";
import { TopRatedProducts } from "../components/pages/homePage/TopRatedProducts";
import { MixSection } from "../components/pages/homePage/MixSection";




export const Home = () => {
  const { allProductsList, setAllProductsList } = useProductContext();


  // Fetch "allProductsList" data, used to check stock value(cart && TabelListProducts => CartAndTableBtns)
  const { data: allProductsData } = Fetch("allProducts");

  // Update allProductsList with fetched data if it is not already set
  useEffect(() => {
    if (allProductsData && allProductsData.products && !allProductsList) {
      setAllProductsList(allProductsData.products);
    }
  }, [allProductsData, allProductsList, setAllProductsList]);



  return (
    <>

      {/* Header component for displaying the main banner */}
      <Header />




      {/* Highlights section */}
      <section className="dottedBorder">
        <HappyHighlights />
      </section>





      <MixSection />



      {/* top-rated products section */}
      <TopRatedProducts />












    </>
  );
};
