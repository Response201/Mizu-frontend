import { useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import { TableListProducts } from "../components/common/TableListProducts/TableListProducts";
import { useGlobalContext } from "../context/GlobalContext";
import { FetchPaymentComplete } from "../services/FetchPaymentComplete";
import { BarLoader } from "../components/common/barLoader/BarLoader";
import { useRef } from "react";

export const PaymentComplete = () => {
    // Extract the `redirect_status` query parameter from the URL
    const queryParams = new URLSearchParams(location.search);
    const redirectStatus = queryParams.get("redirect_status");

    const { token, userId } = useGlobalContext();
    const { setTotalPrice, setCart, receipt, setReceipt, totalPrice, discount, cart } = useCartContext();

    // Function to reset the cart after a successful payment
    const resetCart = () => {
        localStorage.setItem("cart", JSON.stringify([]));
        localStorage.setItem("total", JSON.stringify("0"));
        setCart([]);
        setTotalPrice("0");
    };

    const hasRun = useRef(false);  // Prevents multiple receipt generations if `redirectStatus` changes unexpectedly

    // Fetches the receipt and handles payment completion
    const { handleReceipt, error, loading } = FetchPaymentComplete(token, userId, totalPrice, discount, cart, setReceipt, resetCart);

    // handle payment completion
    useEffect(() => {
        setReceipt({})
        if (redirectStatus === "succeeded" && cart && !hasRun.current) {
            handleReceipt(); // call from FetchPaymentComplete
            hasRun.current = true; // Prevents multiple receipt generations
        } else {
            return;
        }
    }, [redirectStatus]);

    return (
        <article className="paymentContainer">
              {/* Background image for the checkout page */}
              <img src="https://i.ibb.co/sRxRDnJ/Product1.png" alt="background" className='paymentContainer___backgroundImg' />
            <section className="paymentContent">
                <div className="payment">


                    {/* Section for displaying the receipt  */}
                    <section className="paymentItems">
                        {receipt && receipt.products && receipt.totalPrice !== 0 && (
                            <TableListProducts
                                showButtons={false}
                                cart={receipt.products}
                                totalPrice={receipt.totalPrice}
                            />
                        )}
                    </section>


                    {/* Show success message if payment succeeded and receipt is available */}
                    <section className="complete">
                        {loading && <section className="paymentLoader">  <section className="paymentLoaderContainer"> <BarLoader /> </section>
                        </section>}
                        {!error && redirectStatus === "succeeded" && receipt && receipt.products && receipt.totalPrice !== 0 && <h2 className="completeText">
                            Betalning: Betalningen lyckades
                        </h2>}



                        {/* Show error message if payment failed */}
                        {error && <h2 className="completeText">
                            Betalning: Något gick fel
                        </h2>}



                    </section>
                </div>
            </section>
        </article>
    );
};
