import { Button } from "react-bootstrap";
import { useCartContext } from "../../context/CartContext";
import { useProductContext } from "../../context/ProductContext";
import { useGlobalContext } from "../../context/GlobalContext";
import { useEffect, useState } from "react";
import { Fetch } from "../../services/Fetch";

// Komponentdefinitionen
export const CartAndTableBtns = ({ item }) => {
    const { handleFetch, cart } = useCartContext();
    const { allProductsList, setAllProductsList } = useProductContext();
    const { userId } = useGlobalContext();
    const [url, setUrl] = useState("");
    const { data } = Fetch(url);



    // Funktion för att hantera ändringar i varukorgen
    const handleItemToCart = (item, action) => {
        handleFetch(userId, item.productId, action);
    };

    // Uppdatera produktlistan när data hämtas
    useEffect(() => {
        if (data && data.products) {
            setAllProductsList([...data.products]);
            setUrl("");
        }
    }, [data]);

    // Uppdatera URL när varukorgen ändras
    useEffect(() => {
        setUrl("allProducts");
    }, [cart]);

    // Hitta produkten i produktlistan
    const product = allProductsList?.find((element) => element._id === item.productId);

    // Rendera knappar direkt - 
    return (
        <div className="transparent btnContainer">
            <Button
                size="sm"
                className={`btn ${product?.stockLevel === 0 ? "disabled" : ""}`}
                onClick={product?.stockLevel === 0 ? null : () => handleItemToCart(item, "add")}
                
            >
                <i className="bi bi-plus-lg"></i>
            </Button>
            <Button
                size="sm"
                className={`btn ${item.quantity <= 1 ? "disabled" : ""}`}
                onClick={item.quantity <= 1 ? null : () => handleItemToCart(item, "remove")}
               
            >
                <i className="bi bi-dash-lg"></i>
            </Button>
            <Button
                size="sm"
                className="btn"
                onClick={() => handleItemToCart(item, "delete")}
            >
                <i className="bi bi-trash3"></i>
            </Button>
        </div>
    );
};
