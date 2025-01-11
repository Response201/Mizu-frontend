import { createContext, useState, useContext, useEffect } from 'react';


// Create a new context to manage global state
const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {



    /* States in GlobalProvider */
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isHovering, setIsHovering] = useState(false);
    const [userId, setUserId] = useState(
        JSON.parse(localStorage.getItem("userId")) || ''
      );
      const [token, setToken] = useState(
        JSON.parse(localStorage.getItem("token")) || ''
      );
    



/* Hide the error message after 7 seconds */
useEffect(() => {
    setTimeout(() => {
        setError('')
       }, 7000)
}, [error])


    // useEffect to handle token and userId changes, and manage localStorage
    useEffect(() => {
        if(error === "Request failed with status code 403"){
            setError('You need to sign in')
            setToken('')
            setUserId('')
        }

    // Update localStorage whenever token or userId changes
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("userId", JSON.stringify(userId));
    }, [token,userId, error])




    
    // Global state is provided to all children components that use this context
    return (
        <GlobalContext.Provider value={{userId, setUserId, loading, setLoading, error, setError, isHovering, setIsHovering, token, setToken}}>
            {children}
        </GlobalContext.Provider>
    );
};


/* eslint-disable */
// Create custom hook to access GlobalContext
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('GlobalContext must be used within a GlobalProvider');
    }
    return context;
};
