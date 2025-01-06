import { useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { useGlobalContext } from "../context/GlobalContext";
import { useCartContext } from "../context/CartContext";
import { TableListProducts } from "../components/TableListProducts/TableListProducts";
import { CheckoutForm } from "../components/stripePaymentForm/CheckoutForm";
import { useNavigate } from "react-router-dom";
import { UseCheckLoginStatus } from "../services/UseCheckLoginStatus";
import { FetchPayment } from "../services/FetchPayment";
import { BarLoader } from "../components/barLoader/BarLoader";


export const Payment = () => {
    const { cart, totalPrice } = useCartContext();
    const { token } = useGlobalContext();
    const [clientSecret, setClientSecret] = useState("");
    const [stripePromise, setStripePromise] = useState(null);
    const [firstLoader, setFirstLoader] = useState(true)
    const navigate = useNavigate();

    UseCheckLoginStatus();

		 
  
        const fetchData = async () => {
		

			if (JSON.parse(localStorage.getItem("cart"))?.length === 0 || !cart || cart.length === 0 || !token) {
                navigate("/");
            } else {
               
                    const { clientSecret, stripePromise } = await FetchPayment();
                    setClientSecret(clientSecret);
                    setStripePromise(stripePromise);
                    setFirstLoader(false)
               
            }
        };

        fetchData();


    const appearance = { theme: "stripe" };
    const options = { clientSecret, appearance };

    return (
        <article className="productsContainer">
            <section className="paymentContent">
                <section className="payment">
                    <section className="paymentItems">
                        {cart && cart.length >= 1 && (
                            <TableListProducts showButtons={false} cart={cart} totalPrice={totalPrice} />
                        )}
                    </section>

                    
                 {(!clientSecret || !stripePromise && firstLoader) && <section className="paymentLoader">    <section className="paymentLoaderContainer"> <BarLoader /> </section>
</section>}
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
