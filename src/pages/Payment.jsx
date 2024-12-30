import React, { useState, useEffect } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router";
import { useGlobalContext } from "../context/GlobalContext";
import { useCartContext } from "../context/CartContext";
import { TableListProducts } from "../components/TableListProducts/TableListProducts";
import { CheckoutForm } from "../components/stripePaymentForm/CheckoutForm";


export const Payment  = () => {
	const { cart, totalPrice, discount, setReceipt,  receipt } = useCartContext();
	const { userId, token } = useGlobalContext();
	const [clientSecret, setClientSecret] = useState<string>("");
	const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
	const stripePublicKey = import.meta.env.VITE_TEST_VAR;
	const navigate = useNavigate();

	useEffect(() => {
		setStripePromise(
			loadStripe(
				stripePublicKey
			)
		);
		fetch( `${import.meta.env.VITE_BASE_URL}/create-payment-intent`, {
			method: "POST",
			headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
			body: JSON.stringify({ totalPrice, discount, userId, cart }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					console.error("Payment failed:", data.error);
					return;
				}
				setClientSecret(data.clientSecret);
				setReceipt(data.receipt);
			
			})
			.catch((error) => {
				console.error("Error creating payment intent:", error);
			});
	}, []);
	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};
	return (
		<article className="productsContainer">
			<section className="paymentContent">
				<section className="payment">
					<section className="paymentItems">
						{cart && cart.length >= 1 && (
							<TableListProducts showButtons={false} cart={cart} totalPrice={totalPrice} />
						)}
					</section>
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
