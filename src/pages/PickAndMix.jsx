import { useEffect, useState } from "react";
import { Fetch } from "../services/Fetch";
import { useProductContext } from "../context/ProductContext";
import { useCartContext } from "../context/CartContext";
import { UseCheckLoginStatus } from "../services/UseCheckLoginStatus";
import { PickAndMixHeader } from "../components/pages/pickAndMixPage/PickAndMixHeader";
import { DisplayUniqueCategoriesAndProducts } from "../components/pages/pickAndMixPage/DisplayUniqueCategoriesAndProducts";
import PickAndMixCategoryTitels from "../components/pages/pickAndMixPage/PickAndMixCategoryTitels";






export const PickAndMix = () => {
  const { pickAndmixProducts, setPickAndmixProducts } = useProductContext()
  const { cart, setIsProcessing } = useCartContext();
  const [url, setUrl] = useState("sortProducts?pickAndMix=true&limit=100");
  const [newUrl, setNewUrl] = useState("");
  const { data } = Fetch(url || newUrl);



  UseCheckLoginStatus();  // Check if user is logged in and has valid token



  // Update pick-and-mix products when data changes
  useEffect(() => {
    if (data && data.products) {
      setPickAndmixProducts(data.products); // Set products in context
      setUrl(""); // Clear the URL after processing
      setNewUrl(""); // Reset newUrl to prevent duplicate fetches
      setIsProcessing(false); // Prevent multiple requests and re-enable cart actions (add, remove, delete) by setting processing to false
    }
  }, [data]);


  // Trigger a fetch whenever the cart changes - limit 100 products
  useEffect(() => {
    setUrl(`sortProducts?pickAndMix=true&limit=100`);
  }, [cart]);



  return (
    <article className="pickAndMixContainer" >
      <section className="pickAndMixContent">


        {/* Header section */}
        <PickAndMixHeader />

        {/* Display category-titel and productCard */}
        <DisplayUniqueCategoriesAndProducts setNewUrl={setNewUrl} />


        {/* Display message when no products are available */}
        {pickAndmixProducts <= 0 && <section className="pickAndMix">
          <PickAndMixCategoryTitels titel="No products" background="https://i.ibb.co/dfSJHFH/Product2.png" />
        </section>}

      </section>
    </article>
  );
};
