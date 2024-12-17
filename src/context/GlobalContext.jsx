import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    /* States som i GlobalProvider */
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [allProducts, setAllProducts] = useState(JSON.parse(localStorage.getItem("allProducts")) || [])
    const [isHovering, setIsHovering] = useState(false);


const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("userId")) ||'')
const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")) ||'')


    /* sätter localstorage "allProducts" om allProducts förändras */
    useEffect(() => {
        localStorage.setItem("allProducts", JSON.stringify(allProducts));
    }, [allProducts])


    useEffect(() => {
        console.log(error)
        if(error === "Request failed with status code 403"){
            setToken('')
            setUserId('')

        }
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("userId", JSON.stringify(userId));
    }, [token,userId, error])


    /* States som skickas ut till alla children inom contexten */
    return (
        <GlobalContext.Provider value={{userId, setUserId, allProducts, setAllProducts, products, setProducts, loading, setLoading, error, setError, isHovering, setIsHovering, token, setToken}}>
            {children}
        </GlobalContext.Provider>
    );
};

GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

/* Custom hook som ger tillgång till contexten från GlobalContext. Om contexten inte finns, ges ett felmeddelande */
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('GlobalContext must be used within a GlobalProvider');
    }
    return context;
};
