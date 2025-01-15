import { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";
import { useGlobalContext } from "../context/GlobalContext";
import { FetchLogin } from "./FetchLogin";




/**
 * UseCheckLoginStatus
 * 
 * This custom hook is used to check the user's login status and manage the cart state accordingly. 
 * It is primarily used to verify if the user is logged in when the page loads or when the login status changes.
 * 
 * **Key Responsibilities:**
 * - Verifies if the user has a valid `userId` and `token` in the global context.
 * - If both are present, it makes an API call (`checkLoginStatus`) to confirm the login status.
 * - If the user is not authorized (i.e., status 403), it clears the `userId` and `token`.
 * - If the login is successful, it fetches the user's cart and updates the cart in the global context and local storage.
 * 
 * **Note:** This hook is used to maintain the login status and synchronize the cart across sessions. It ensures the user remains logged in and keeps the cart up to date after page reloads or when the session status changes.
             It is used especially during app initialization to validate login status.  
*/







export const UseCheckLoginStatus = () => {
  const { userId, token, setUserId, setToken } = useGlobalContext();  // Access global context values
  const { setCart } = useCartContext();  // Access cart context to update the cart


  // Effect hook to check login status on userId or token change
  useEffect(() => {
    const checkLoginStatus = async () => {
      if (!userId || !token)return; 

      try {
        // Verify login status with FetchLogin 
        const response = await FetchLogin("checkLoginStatus", { userId }, token);
        // If login failed (403), clear userId and token
        if (response.message === "Request failed with status code 403") {
          setToken("");
          setUserId("");
         
        } else {
          // If login is successful, fetch the user's cart
          const cartResponse = await FetchLogin("getCart", { userId }, token);
          if (cartResponse.cart?.products) {
            // If cart products exist, update localStorage and global cart state
            localStorage.setItem("cart", JSON.stringify(cartResponse.cart.products))
          }   
        }
      } catch (error) {
        // Handle any errors by clearing user data
        setToken("");
        setUserId("");
        console.error("Error checking login status:", error);
      } 
    };

    checkLoginStatus();
  }, [userId, token, setUserId, setToken, setCart]);  

};


