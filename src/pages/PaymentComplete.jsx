import  { useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import { TableListProducts } from "../components/TableListProducts/TableListProducts";
import { useGlobalContext } from "../context/GlobalContext";

export const PaymentComplete = () => {
    const queryParams = new URLSearchParams(location.search);
    const redirectStatus = queryParams.get("redirect_status");
	const {token,userId}= useGlobalContext();
    const { setTotalPrice, setCart, receipt, setReceipt, totalPrice, discount, cart } = useCartContext();

    const handleReceipt = async () => {

        try {
			setReceipt({})
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
                console.error("Payment failed:", data.error);
                return;
            }
            setReceipt(data.receipt);
            resetCart();
        } catch (error) {
            console.error("Error creating receipt:", error);
        }
    };

    const resetCart = () => {
        localStorage.setItem("cart", JSON.stringify([]));
        localStorage.setItem("total", JSON.stringify("0"));
        setCart([]);
        setTotalPrice("0");
    };

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
					{receipt && receipt.products && receipt.totalPrice &&  (
                            <TableListProducts
                                showButtons={false}
                                cart={receipt.products}
                                totalPrice={receipt.totalPrice}
                            />
                        )}
                    </section>
                    <section className="complete">
                        <h2 className="completeText">
                            Betalning: {redirectStatus === "succeeded" ? "Betalningen lyckades" : "Något gick fel"}
                        </h2>
                    </section>
                </div>
            </section>
        </article>
    );
};
