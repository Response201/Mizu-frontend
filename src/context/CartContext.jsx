import { createContext, useState, useContext, useEffect } from 'react';
import { useGlobalContext } from './GlobalContext';
import { FetchCart } from '../services/FetchCart';



// Create a new context to manage global state
const CartContext = createContext();



export const CartProvider = ({ children }) => {
    // Accessing global context for error handling and token
    const { setError, token } = useGlobalContext()
    // State variables
    const [totalPrice, setTotalPrice] = useState(JSON.parse(localStorage.getItem("totalPrice")) || 0);
    const [discount, setDiscount] = useState(JSON.parse(localStorage.getItem("discount")) || 0);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    const [cartMessage, setCartMessage] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [notify, setNotify] = useState('')
    const [receipt, setReceipt] = useState(JSON.parse(localStorage.getItem("receipt")) || [])
const [discountProducts, setDiscountProducts] = useState(JSON.parse(localStorage.getItem("dicountProducts")) || [])

    // Store receipt in localStorage whenever it changes
    useEffect(() => {
        if (receipt)
            localStorage.setItem("receipt", JSON.stringify(receipt));
    }, [receipt])



    // Function to handle fetch request for cart updates
    const handleFetch = async (userId, productId, actionType, showNotify) => {

        if (isProcessing) return; // Avoid making multiple requests at the same time

        setIsProcessing(true);
        const url = "cart"  // API endpoint for cart
        const data = { userId, productId, action: actionType };// Data to send with request
        const response = await FetchCart(url, data, token, setError, setCartMessage, setIsProcessing);

        // If cart is updated successfully, store the new cart and update total price
        if (response && response.cart.products && response.message === "Cart updated successfully") {
            setCart(response.cart.products); // Update cart state
            localStorage.setItem("cart", JSON.stringify(response.cart.products)); // set cart localStorage
            handleTotalPrice(userId); // Update total price and discount

            if (showNotify) {
                setNotify('added to cart')  // Show notification if specified
            }
        }


    };

    // Function to calculate total price and discount from the backend
    const handleTotalPrice = async (userId) => {
        const url = "totalPrice"; // API endpoint for total price calculation
        const data = { userId }; // Send user ID to backend
        setIsProcessing(true);
        const response = await FetchCart(url, data, token, setError, setCartMessage);

        // If response contains total price, update state and localStorage
        if (response.totalprice) {
            const totalprice = Math.round(Number(response.totalprice) * 2) / 2; // Round total price to nearest 0.5
            const discount = Math.round(Number(response.discount) * 2) / 2; // Round total price to nearest 0.5
            setTotalPrice(totalprice) // Update totalPrice state
            setDiscount(discount) // Update discount state
       
            localStorage.setItem("totalPrice", JSON.stringify(totalprice)) // set totalPrice localStorage
            localStorage.setItem("discount", JSON.stringify(discount)) // set discount  localStorage
       

            if (response.groups && Array.isArray(response.groups)) {
                console.log("Groups from backend:", response.groups);
                setDiscountProducts(response.groups);
                localStorage.setItem("discountProducts", JSON.stringify(response.groups));
                console.log("Stored in localStorage:", localStorage.getItem("discountProducts"));
            } else {
                console.error("Invalid groups format:", response.groups);
            }

        }

    };

    // Global state is provided to all children components that use this context
    return (
        <CartContext.Provider value={{
            totalPrice,
            setTotalPrice,
            discount, setDiscount,
            handleFetch, notify, setNotify,
            cart, setCart, cartMessage, receipt, setReceipt, isProcessing, setIsProcessing, discountProducts, setDiscountProducts, handleTotalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};

/* eslint-disable */
// Create custom hook to access Cart context
export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('CartContext must be used within a CartProvider');
    }
    return context;
};
