
import { useCartContext } from '../context/CartContext';
import noProductsImg from "../assets/images/no-products-found.png"
import { TableListProducts } from '../components/common/TableListProducts/TableListProducts';
export const CheckOut = () => {
    const { cart, totalPrice } = useCartContext()
    const showButtons = true;
    console.log(cart)
    return (
        <article className='checkoutContainer'>
            <img src="https://i.ibb.co/sRxRDnJ/Product1.png" alt="background" className='checkoutContainer___backgroundImg' />
            <section className='checkoutContent'>
                <section className='checkoutContent___tabelContainer'>
                    {cart && cart.length >= 1 ?
                        <TableListProducts showButtons={showButtons} cart={cart} totalPrice={totalPrice} />
                        : <section className="checkoutContent___tabelContainer___noProductsImgContainer">
                            <img src={noProductsImg} alt="No products found" />
                        </section>
                    }
                </section>
            </section>
        </article>
    )
}
