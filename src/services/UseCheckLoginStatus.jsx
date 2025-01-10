import { useEffect, useState } from "react";

import { useCartContext } from "../context/CartContext";
import { useGlobalContext } from "../context/GlobalContext";
import { FetchLogin } from "./FetchLogin";

export const UseCheckLoginStatus = () => {
  const { userId, token, setUserId, setToken } = useGlobalContext();
const {setCart} = useCartContext();
const [isProcessing, setIsProcessing] = useState(true);
  useEffect(() => {
    const checkLoginStatus = async () => {
      if (!userId || !token) return;

      try {
        const response = await FetchLogin("checkLoginStatus", { userId }, token);

        if (response.message === "Request failed with status code 403") {
          setToken("");
          setUserId("");
        } else {
          const cartResponse = await FetchLogin("getCart", { userId }, token);
          if (cartResponse.cart?.products) {
            localStorage.setItem("cart", JSON.stringify(cartResponse.cart.products))
            setCart(cartResponse.cart.products);
          }
        }
      } catch (error) {
        setToken("");
        setUserId("");
        console.error("Error checking login status:", error);
      }finally {
        setIsProcessing(false); 
      }
    };

    checkLoginStatus();
  }, [userId, token, setUserId, setToken, setCart]);
  return isProcessing;
};


