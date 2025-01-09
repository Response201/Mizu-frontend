import { useEffect, useState } from "react";
import { Fetch } from "../services/Fetch";
import { useProductContext } from "../context/ProductContext";
import { useCartContext } from "../context/CartContext";
import { UseCheckLoginStatus } from "../services/UseCheckLoginStatus";

import { PickAndMixHeader } from "../components/pickAndMix/PickAndMixHeader";
import { DisplayUniqueCategoriesAndProducts } from "../components/pickAndMix/DisplayUniqueCategoriesAndProducts";
import PickAndMixCategoryTitels from "../components/pickAndMix/PickAndMixCategoryTitels";






export const PickAndMix = () => {
  const { pickAndmixProducts, setPickAndmixProducts } = useProductContext()
  const { cart, setIsProcessing, notify } = useCartContext();
  const [url, setUrl] = useState("sortProducts?pickAndMix=true");
  const [newUrl, setNewUrl] = useState("");
  const { data } = Fetch(url || newUrl);



  // Check if user is logged in and has valid token
  UseCheckLoginStatus();



  /* if data chnges */
  useEffect(() => {
    if (data && data.products) {
      setPickAndmixProducts(data.products);
      setUrl("");
      setNewUrl("");
      setIsProcessing(false)
    }
  }, [data]);


  /* If cart changes */
  useEffect(() => {
    setUrl(`sortProducts?pickAndMix=true`);
  }, [cart]);



  return (
    <article className="pickAndMixContainer" >
      <section className="pickAndMixContent">


        {/* Header component */}
        <PickAndMixHeader />

        {/* Display category titel and productCard */}
        <DisplayUniqueCategoriesAndProducts setNewUrl={setNewUrl} />


{/* Notify */}


        {/* if no products   */}
        {pickAndmixProducts <= 0 && <section className="pickAndMix">
          <PickAndMixCategoryTitels titel="No products" background="https://i.ibb.co/dfSJHFH/Product2.png" />
        </section>}

      </section>
    </article>
  );
};
