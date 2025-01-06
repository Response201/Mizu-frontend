import { useEffect, useState } from "react";
import { Fetch } from "../services/Fetch";
import { useProductContext } from "../context/ProductContext";
import { useCartContext } from "../context/CartContext";
import { UseCheckLoginStatus } from "../services/UseCheckLoginStatus";
import { PickAndMixCategoryTitels } from "../components/pickAndMix/pickAndMixCategoryTitels";
import { PickAndMixHeader } from "../components/pickAndMix/PickAndMixHeader";
import { DisplayUniqueCategoriesAndProducts } from "../components/pickAndMix/DisplayUniqueCategoriesAndProducts";



export const PickAndMix = () => {
  const { pickAndmixProducts, setPickAndmixProducts } = useProductContext()
  const { cart } = useCartContext();
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




{/* if no products   */}
        {pickAndmixProducts <= 0 && <section className="pickAndMix">
          <PickAndMixCategoryTitels titel="No products" background="https://i.ibb.co/dfSJHFH/Product2.png" />
        </section>}

      </section>
    </article>
  );
};
