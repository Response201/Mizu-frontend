import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCartContext } from "../context/CartContext";
import { useGlobalContext } from "../context/GlobalContext";



export const FetchPayment = () => {
    const { totalPrice } = useCartContext();
    const { token } = useGlobalContext();
    const [clientSecret, setClientSecret] = useState("");
    const [stripePromise, setStripePromise] = useState(null);
    const stripePublicKey = import.meta.env.VITE_TEST_VAR;

    useEffect(() => {
        const setupPayment = async () => {
            try {


                if (!stripePublicKey) {
                    console.error("Stripe public key is missing.");
                    return;
                }

                const stripe = await loadStripe(stripePublicKey);
                setStripePromise(stripe);

                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/create-payment-intent`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ totalPrice }),
                });

                const data = await response.json();
                if (data.error) {
                    console.error("Payment failed:", data.error);
                    return;
                }

                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error("Unexpected error:", error);
            }
        };

        setupPayment();
    }, [totalPrice, token, stripePublicKey]);

    return { clientSecret, stripePromise };
};
