import { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

export const CheckoutForm = () => {
    const stripe = useStripe();  // Hook to access Stripe instance
    const elements = useElements();  // Hook to access Stripe elements (PaymentElement)
    const [message, setMessage] = useState("");  // State to store the payment message (success/error)
    const [isLoading, setIsLoading] = useState(false); // Prevent multiple requests and re-enable cart actions (add, remove, delete) by setting processing to false


    // useEffect hook to handle the payment intent on component mount
    useEffect(() => {
        if (!stripe) return;  // Ensure stripe is loaded

        // Extract client secret from URL query parameters
        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        // If no client secret, return
        if (!clientSecret) return;

        // Retrieve payment intent and handle its status
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]); // Run this effect when the stripe instance is loaded


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission

        if (!stripe || !elements) {
            return; // Ensure Stripe and elements are loaded before proceeding
        }
        setIsLoading(true);

        // Confirm the payment with Stripe
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${import.meta.env.VITE_APP_URL}/paymentComplete`,  // URL to redirect user after payment
            },
        })


        // Handle any errors during payment confirmation
        if (error?.type === "card_error" || error?.type === "validation_error") {
            setMessage(error.message || "An error occurred."); 
        } else {
            setMessage("An unexpected error occurred.");  
        }

        setIsLoading(false); 
    };


    // Payment element options, customize the layout and theme
    const paymentElementOptions = {
        layout: "tabs",
        paymentMethodTypes: ["card"],
        theme: "stripe"
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} style={{ zIndex: "10000" }}>

            {/* Render the Payment Element component -> send in paymentElementOptions */}
            <PaymentElement id="payment-element" options={paymentElementOptions} />

            {/* Submit button with loading state */}
            <button className="paymentbtn" disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>

            {/* Display any messages (success/error) */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
};
