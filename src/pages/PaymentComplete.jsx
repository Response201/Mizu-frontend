import  { useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import { TableListProducts } from "../components/TableListProducts/TableListProducts";
import { FetchPaymentComplete } from "../services/FetchPaymentComplete";

export const PaymentComplete = () => {
    const queryParams = new URLSearchParams(location.search);
    const redirectStatus = queryParams.get("redirect_status");

    const {  receipt} = useCartContext();
// Call the custom hook for payment completion logic
const { completePayment, error, loading} = FetchPaymentComplete();


useEffect(() => {
    const handleReceipt = async () => {
      try {
        await completePayment();
      } catch (error) {
        console.error("Error creating receipt:", error);
      }
    };

    if (redirectStatus === "succeeded") {
      handleReceipt(); 
    }
  }, [redirectStatus, completePayment]); 


    return (
        <article className="paymentContainer">
            <section className="paymentContent">
                <div className="payment">
                    {error && <p>somthing wentwrong</p>}
                    {loading && <p>loading..</p>}
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
                            Betalning: {!error && redirectStatus === "succeeded" ? "Betalningen lyckades" : "Något gick fel"}
                        </h2>
                    </section>
                </div>
            </section>
        </article>
    );
};
