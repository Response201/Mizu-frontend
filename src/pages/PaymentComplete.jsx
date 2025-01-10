import  { useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import { TableListProducts } from "../components/common/TableListProducts/TableListProducts";
import { useGlobalContext } from "../context/GlobalContext";
import { FetchPaymentComplete } from "../services/FetchPaymentComplete";
import { BarLoader } from "../components/common/barLoader/BarLoader";
import { useRef } from "react";

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
    /* motverkar att två kvitton skapas om redirectStatus ändras okontrollerat */
    const hasRun = useRef(false);
    const { handleReceipt,  error, loading } = FetchPaymentComplete(token, userId, totalPrice, discount, cart, setReceipt, resetCart);

    useEffect(() => {
      setReceipt({})
        if (redirectStatus === "succeeded" && cart && !hasRun.current) {
            handleReceipt();
            hasRun.current = true;
        }else{
            return;
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
                       
                         { loading &&  <section className="paymentLoader">  <section className="paymentLoaderContainer"> <BarLoader /> </section>
                            </section>}
                            {!error && redirectStatus === "succeeded" && receipt && receipt.products && receipt.totalPrice !== 0  &&  <h2 className="completeText">
                                Betalning: Betalningen lyckades
                                </h2> }


                                {error  &&  <h2 className="completeText">
                                Betalning: Något gick fel
                                </h2> }

                    </section>
                </div>
            </section>
        </article>
    );
};
