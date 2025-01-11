import { useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { useGlobalContext } from "../context/GlobalContext";
import { useCartContext } from "../context/CartContext";
import { TableListProducts } from "../components/common/TableListProducts/TableListProducts";
import { useNavigate } from "react-router-dom";
import { UseCheckLoginStatus } from "../services/UseCheckLoginStatus";
import { FetchPayment } from "../services/FetchPayment";
import { BarLoader } from "../components/common/barLoader/BarLoader";
import { CheckoutForm } from "../components/pages/paymentPage/CheckoutForm";


export const Payment = () => {
    const { cart, totalPrice } = useCartContext();
    const { token } = useGlobalContext();

    // Local state for managing Stripe client secret and promise
    const [clientSecret, setClientSecret] = useState("");
    const [stripePromise, setStripePromise] = useState(null);
    // State to manage the initial loading state
    const [firstLoader, setFirstLoader] = useState(true)
    const navigate = useNavigate();

    UseCheckLoginStatus(); // Check if the user is logged in


    // Fetch data for the payment process
    const fetchData = async () => {

        // Check if the cart is empty or the user is not logged in
        if (JSON.parse(localStorage.getItem("cart"))?.length === 0 || !cart || cart.length === 0 || !token) {
            navigate("/");
        } else {
            // Fetch client secret and Stripe promise for payment
            const { clientSecret, stripePromise } = await FetchPayment();
            setClientSecret(clientSecret);
            setStripePromise(stripePromise);
            setFirstLoader(false)

        }
    };

    fetchData(); // Call fetchData when the component mounts

    // Configuration options for Stripe Elements
    const options = { clientSecret };

    return (
        <article className="paymentContainer">
            <section className="paymentContent">
                <section className="payment">


                    {/* Tabel */}
                    <section className="paymentItems">
                        {/* Display cart items if the cart is not empty */}
                        {cart && cart.length >= 1 && (
                            <TableListProducts showButtons={false} cart={cart} totalPrice={totalPrice} />
                        )}
                    </section>


                    {/* Show loader if payment data is still loading */}
                    {(!clientSecret || !stripePromise && firstLoader && !cart) && <section className="paymentLoader">    <section className="paymentLoaderContainer"> <BarLoader /> </section>
                    </section>}


                    {/* Render payment form if client secret and Stripe promise are available */}
                    {clientSecret && stripePromise && (
                        <section className="form">
                            <Elements stripe={stripePromise} options={options}>
                                <CheckoutForm />
                            </Elements>
                        </section>
                    )}

                    
                </section>
            </section>
        </article>
    );
};
