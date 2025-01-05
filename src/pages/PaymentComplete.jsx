import  { useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import { TableListProducts } from "../components/TableListProducts/TableListProducts";
import { useGlobalContext } from "../context/GlobalContext";
import { FetchPaymentComplete } from "../services/FetchPaymentComplete";

export const PaymentComplete = () => {
    const queryParams = new URLSearchParams(location.search);
    const redirectStatus = queryParams.get("redirect_status");
	const {token,userId}= useGlobalContext();
    const { setTotalPrice, setCart, receipt, setReceipt, totalPrice, discount, cart } = useCartContext();
    const resetCart = () => {
        localStorage.setItem("cart", JSON.stringify([]));
        localStorage.setItem("total", JSON.stringify("0"));
        setCart([]);
        setTotalPrice("0");
    };

    const { handleReceipt,  error } = FetchPaymentComplete(token, userId, totalPrice, discount, cart, setReceipt, resetCart);

    useEffect(() => {
        if (redirectStatus === "succeeded") {
            handleReceipt();
        }
    }, [redirectStatus]);

    return (
        <article className="paymentContainer">
            <section className="paymentContent">
                <div className="payment">
                    <section className="paymentItems">
					{receipt && receipt.products && receipt.totalPrice !== 0 &&  (
                            <TableListProducts
                                showButtons={false}
                                cart={receipt.products}
                                totalPrice={receipt.totalPrice}
                            />
                        )}
                    </section>
                    <section className="complete">
                        <h2 className="completeText">
                            Betalning: {!error && redirectStatus === "succeeded" && receipt && receipt.products.lenght && receipt.totalPrice !== 0  ? "Betalningen lyckades" : "Något gick fel"}
                        </h2>
                    </section>
                </div>
            </section>
        </article>
    );
};
