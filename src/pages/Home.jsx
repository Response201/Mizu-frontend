import { useEffect, useState } from "react";

import { Header } from "../components/home/header";
import { HappyHighlights } from "../components/home/HappyHighlights";
import { TopRatedProducts } from "../components/home/TopRatedProducts";
import { Fetch } from "../services/Fetch";
import { useProductContext } from "../context/ProductContext";

export const Home = () => {
  const { setBeforeFilteringProducts, setTotalPages, allProductsList, setAllProductsList } = useProductContext();

  // Fetch for "beforeFilteringProducts"
  const { data: topRatedData } = Fetch("sortProducts?limit=9&search=&sort=averageRating:desc&category=all");

  useEffect(() => {
    if (topRatedData && topRatedData.products) {
      setBeforeFilteringProducts(topRatedData.products);
      setTotalPages(Math.ceil(topRatedData.total / topRatedData.limit));
    }
  }, [topRatedData, setBeforeFilteringProducts, setTotalPages]);

  // Fetch for "allProductsList"
  const { data: allProductsData } = Fetch("allProducts"); 

  useEffect(() => {
    if (allProductsData && allProductsData.products && !allProductsList) {
      setAllProductsList(allProductsData.products);
    }
  }, [allProductsData, setAllProductsList]);


console.log(allProductsList)

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
