import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCartContext } from "../context/CartContext";
import { useGlobalContext } from "../context/GlobalContext";




/**
 * FetchPayment
 * 
 * This function handles the setup of a Stripe payment session. It fetches the `clientSecret` needed for payment processing and loads the Stripe object using the public key.
 * It is used to initiate the payment process, including creating a payment intent and returning necessary payment data.
 * The function relies on the `totalPrice` from the cart and the user's `token` for authentication.
 * 
 * **Note:** This function is primarily used for payment processing and setting up Stripe integration in the application(Payment & PaymentComplete).
 *
 */





export const FetchPayment = () => {
    const { totalPrice } = useCartContext();
    const { token } = useGlobalContext();
    const [clientSecret, setClientSecret] = useState("");
    const [stripePromise, setStripePromise] = useState(null);
    const stripePublicKey = import.meta.env.VITE_TEST_VAR;

    useEffect(() => {
          // Function to setup payment process by creating a payment intent
        const setupPayment = async () => {
            try {

    // Check if Stripe public key exists
                if (!stripePublicKey) {
                    console.error("Stripe public key is missing.");// Log error if public key is not found
                    return;
                }

      // Load Stripe with the public key
                const stripe = await loadStripe(stripePublicKey);
                setStripePromise(stripe);

                  // Send request to create payment intent on the server
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/create-payment-intent`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Include authentication token in request headers
                    },
                    body: JSON.stringify({ totalPrice }), // Send the total price in the request body
                });

                const data = await response.json();
                if (data.error) {
                    console.error("Payment failed:", data.error); // Log if payment failed
                    return;
                }
    // Set client secret from response to proceed with Stripe payment
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error("Unexpected error:", error);  // Log any unexpected errors
            }
        };


        // Trigger setupPayment when totalPrice, token, or stripePublicKey changes
        setupPayment();
    }, [totalPrice, token, stripePublicKey]);

      // Return the client secret and stripePromise
    return { clientSecret, stripePromise };
};
