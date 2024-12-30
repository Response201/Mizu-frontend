import React, { useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import { TableListProducts } from "../components/TableListProducts/TableListProducts";



export const PaymentComplete = () => {
	const queryParams = new URLSearchParams(location.search);
	const redirectStatus = queryParams.get("redirect_status");
	const {  setTotalPrice, setCart, oldCartItems, oldTotalPrice, receipt  } = useCartContext();



useEffect(() => {


	
if(redirectStatus === "succeeded"){

	localStorage.setItem("cart", JSON.stringify([]));
	localStorage.setItem("total", JSON.stringify('0'));
	localStorage.setItem("cart", JSON.stringify([]))
	setCart([])
	setTotalPrice("0")

 }

}, [])

console.log(receipt.products)



	return (
		<article className="paymentContainer">
			<section className="paymentContent">
				
				    
		<div className="payment">
			<section className="paymentItems">
				
					{receipt &&
						<TableListProducts showButtons={false} cart={receipt.products} totalPrice={receipt.totalPrice} />
					}
				
		
			</section>
			<section className="complete">
				<section className="form ">
					<h2 className="completeText">
						Betalning: {redirectStatus == "succeeded" ? "Betalningen lyckades" : "Något gick fel"}{" "}
					</h2>
				</section>
			</section>
		</div>
		</section>  
		</article>
	);
};
