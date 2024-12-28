import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useGlobalContext } from './GlobalContext';
import { FetchCart } from '../services/FetchCart';
const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const { setError, token } = useGlobalContext()
    const [totalPrice, setTotalPrice] = useState(JSON.parse(localStorage.getItem("totalPrice")) || 0);
    const [discount, setDiscount] = useState(JSON.parse(localStorage.getItem("discount")) || 0);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    const [cartMessage, setCartMessage] = useState('')
    // Fetch function




    const handleFetch = async (userId,  productId, actionType) => {
const url = "cart"
        const data = {
            userId,
            productId,
            action: actionType,
        };
        const response = await FetchCart(url, data, token, setError, setCartMessage);

     



            if ( response && response.cart.products && response.message === "Cart updated successfully") {
             
                setCart(response.cart.products)
                localStorage.setItem("cart", JSON.stringify(response.cart.products))
                handleTotalPrice(userId)
            }
         
          
    };
    const handleTotalPrice = async (userId) => {
       const url = "totalPrice"

        const data = {
            userId
        };
        const response = await FetchCart(url, data, token, setError, setCartMessage);

        console.log(response)

            if (response.totalprice) {
               
                /* Ensure it's a number and round to the nearest 0.5 */
                const totalprice = Math.round(Number(response.totalprice) * 2) / 2;
                const discount = Math.round(Number(response.discount) * 2) / 2
                setTotalPrice(totalprice)
                setDiscount(discount)
                localStorage.setItem("totalPrice", JSON.stringify(totalprice))
                localStorage.setItem("discount", JSON.stringify(discount))
            }
       
    };
    return (
        <CartContext.Provider value={{
            totalPrice,
            setTotalPrice,
            discount, setDiscount,
            handleFetch,
            cart, setCart, cartMessage
        }}>
            {children}
        </CartContext.Provider>
    );
};
CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('CartContext must be used within a CartProvider');
    }
    return context;
};
