import { useState } from 'react';


export const FetchPaymentComplete  = (token, userId, totalPrice, discount, cart, setReceipt, resetCart) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleReceipt = async () => {
        setLoading(true);
        setError(null);
        
        try {
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
                setError(data.error);
                console.error("Payment failed:", data.error);
                return;
            }
            
            setReceipt(data.receipt);
            resetCart();
        } catch (err) {
            setError("Error creating receipt: " + err.message);
            console.error("Error creating receipt:", err);
        } finally {
            setLoading(false);
        }
    };

    return { handleReceipt, loading, error };
};
