import { useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { Header } from "../components/home/header";
import { HappyHighlights } from "../components/home/HappyHighlights";
import { TopRatedProducts } from "../components/home/TopRatedProducts";
import { Fetch } from "../services/Fetch";

export const Home = () => {
  const { setBeforeFilteringProducts } = useGlobalContext();
  const { data } = Fetch("sortProducts?limit=9&search=&sort=averageRating:desc&category=all&page=1");

  useEffect(() => {
    if (data && data.products) {
      setBeforeFilteringProducts(data.products);
    }
  }, [data, setBeforeFilteringProducts]);

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
