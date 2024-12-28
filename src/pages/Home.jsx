import { useEffect } from "react";

import { Header } from "../components/home/header";
import { HappyHighlights } from "../components/home/HappyHighlights";
import { TopRatedProducts } from "../components/home/TopRatedProducts";
import { Fetch } from "../services/Fetch";
import { useProductContext } from "../context/ProductContext";

export const Home = () => {
  const { setBeforeFilteringProducts, setTotalPages } = useProductContext();
  const { data } = Fetch("sortProducts?limit=9&search=&sort=averageRating:desc&category=all");

  useEffect(() => {
    if (data && data.products) {
      setBeforeFilteringProducts(data.products);
      setTotalPages(Math.ceil(data.total / data.limit))
    }
  }, [data, setBeforeFilteringProducts,setTotalPages]);

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
