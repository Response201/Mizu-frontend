
import { useCartContext } from '../context/CartContext';
import noProductsImg from "../assets/images/no-products-found.png"
import { TableListProducts } from '../components/common/TableListProducts/TableListProducts';

export const CheckOut = () => {

    const { cart, totalPrice } = useCartContext()
    const showButtons = true; // Controls the display of add, remove, and delete buttons in the TableListProducts component for managing the cart

    return (
        <article className='checkoutContainer'>

            {/* Background image for the checkout page */}
            <img src="https://i.ibb.co/sRxRDnJ/Product1.png" alt="background" className='checkoutContainer___backgroundImg' />

            {/* Main content section */}
            <section className='checkoutContent'>

                {/* Table container to display products or fallback image */}
                <section className='checkoutContent___tabelContainer'>

                    {/* Check if there are products in the cart */}
                    {cart && cart.length >= 1 ?

                        <TableListProducts showButtons={showButtons} cart={cart} totalPrice={totalPrice} />

                        :

                        // Fallback image for empty cart
                        <section className="checkoutContent___tabelContainer___noProductsImgContainer">
                            <img src={noProductsImg} alt="No products found" />
                        </section>

                    }


                </section>
            </section>
        </article>
    )
}
