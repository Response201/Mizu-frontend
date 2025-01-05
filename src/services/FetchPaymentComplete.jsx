import { useState } from 'react';
import { useCartContext } from '../context/CartContext';
import { useGlobalContext } from '../context/GlobalContext';

export const FetchPaymentComplete = () => {
  const { token, userId } = useGlobalContext();
  const { setTotalPrice, setCart, setReceipt, totalPrice, discount, cart } = useCartContext();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetCart = () => {
    localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("total", JSON.stringify("0"));
    setCart([]);
    setTotalPrice("0");
  };

  const fetchPaymentComplete = async () => {
    try {
      setLoading(true); // Set loading to true before the request
      setError(null); // Reset error
setReceipt({})
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/paymentComplete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ totalPrice, discount, userId, cart }),
      });
      
      const data = await response.json();

      if (data.error) {
        setError(`Payment failed: ${data.error}`);
        console.error("Payment failed:", data.error);
        return;
      }

      setReceipt(data.receipt);
      resetCart();

    } catch (error) {
      setError(`Error creating receipt: ${error.message}`);
      console.error("Error creating receipt:", error);
    } finally {
      setLoading(false); // Set loading to false after the request
    }
  };

  return {
    fetchPaymentComplete,
    loading,
    error,
  };
};
