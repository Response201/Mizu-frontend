import { useState } from 'react';

/**
 * FetchPaymentComplete
 * 
 * This function handles the completion of a payment and generates a receipt for the user.
 * After a payment is confirmed, it sends the necessary information (totalPrice, discount, userId, cart) to the server
 * to create a receipt.
 * 
 * **Note:** This function is used when a payment is successfully processed, and the system needs to generate a receipt.
 */

export const FetchPaymentComplete = (token, userId, totalPrice, discount, cart, setReceipt, resetCart) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to handle creating a receipt after a payment is completed
    const handleReceipt = async () => {
        setLoading(true);
        setError(null);

        try {
            // Make a POST request to the server to create a receipt
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/paymentComplete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,   // Include the authentication token in the request
                },
                body: JSON.stringify({ totalPrice, discount, userId, cart }), // Send payment details in the request body
            });

            const data = await response.json();

            // Handle any errors returned by the server
            if (data.error) {
                setError(data.error);
                console.error("Payment failed:", data.error);
                return;
            }

            // Set the receipt data in state and reset the cart
            setReceipt(data.receipt);  // Store the generated receipt in the state
            resetCart();  // Clear the cart after payment completio
        } catch (err) {
            // Handle unexpected errors
            setError("Error creating receipt: " + err.message);
            console.error("Error creating receipt:", err);
        } finally {
            setLoading(false);  // Set loading state to false after the request finishes
        }
    };
    // Return the handleReceipt function along with loading and error states
    return { handleReceipt, loading, error };
};
