import { Button } from "react-bootstrap";
import { useCartContext } from "../../../context/CartContext";
import { useProductContext } from "../../../context/ProductContext";
import { useGlobalContext } from "../../../context/GlobalContext";
import { useEffect, useState } from "react";
import { Fetch } from "../../../services/Fetch";

// Komponentdefinitionen
export const CartAndTableBtns = ({ item }) => {
    const { handleFetch, cart, setIsProcessing, isProcessing } = useCartContext(); //cart context
    const { allProductsList, setAllProductsList } = useProductContext(); // product context
    const { userId } = useGlobalContext(); // global context
    const [url, setUrl] = useState("");
    const { data } = Fetch(url); // Fetch data based on the URL

    // Find the product in the allProductsList that matches the current item's productId
    // This allow access the product details (like stock level) needed to enable/disable buttons
    const product = allProductsList?.find((element) => element._id === item.productId);





    // Function to handle adding/removing/deleting items in the cart
    const handleItemToCart = (item, action) => {
        handleFetch(userId, item.productId, action, false);  // Call the fetch function with appropriate action
    };




    // Update the product list when new data is fetched
    useEffect(() => {
        if (data && data.products) {
            setAllProductsList([...data.products]);  // Update the list of products
            setUrl("");  // Reset the URL after data is fetched
            setIsProcessing(false) // Prevent multiple requests and re-enable cart actions (add, remove, delete) by setting processing to false

        }
    }, [data]);




    // Update the URL when the cart changes
    useEffect(() => {
        setUrl("allProducts");  // Set the URL to fetch all products whenever the cart changes
    }, [cart]);








    // Render the buttons (add, remove, delete) for each product in the cart
    return (
        <div className="transparent btnContainer">


            {/* Button to add an item to the cart */}
            <Button
                size="sm"
                className={`btn ${product?.stockLevel === 0 || isProcessing ? "disabled" : ""}`} // Disable the button if the product is out of stock (stockLevel === 0) or if processing is ongoing
                onClick={product?.stockLevel === 0 || isProcessing ? null : () => handleItemToCart(item, "add")} // Prevent adding to the cart if the product is out of stock or if processing is true
            >
                <i className="bi bi-plus-lg"></i>
            </Button>


            {/* Button to remove an item from the cart */}
            <Button
                size="sm"
                className={`btn ${item.quantity <= 1 || isProcessing ? "disabled" : ""}`}  // Disable the button if the item quantity is 1 or less, or if processing is ongoing
                onClick={item.quantity <= 1 || isProcessing ? null : () => handleItemToCart(item, "remove")}  // Prevent removing from the cart if quantity is 1 or less, or if processing is true

            >
                <i className="bi bi-dash-lg"></i>
            </Button>

            {/* Button to delete an item from the cart */}
            <Button
                size="sm"
                className={isProcessing ? "disabled btn" : "btn"}  // Disable the button if processing is ongoing
                onClick={isProcessing ? null : () => handleItemToCart(item, "delete")}  // Prevent deleting from the cart if processing is true
            >
                <i className="bi bi-trash3"></i>
            </Button>
        </div>
    );
};
