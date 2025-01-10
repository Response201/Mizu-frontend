import { createContext, useState, useContext, useEffect } from 'react';



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

    useEffect(() => {
        if(error === "Request failed with status code 403"){
            setError('You need to sign in')
            setToken('')
            setUserId('')
        }
     /* if userid or token changes set local storage to new value */
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("userId", JSON.stringify(userId));
    }, [token,userId, error])




    
    /* States sent out to all children within the context */
    return (
        <GlobalContext.Provider value={{userId, setUserId, loading, setLoading, error, setError, isHovering, setIsHovering, token, setToken}}>
            {children}
        </GlobalContext.Provider>
    );
};


/* eslint-disable */
/* Custom hook that provides access to the context from GlobalContext. If the context doesn't exist, an error message is given */
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('GlobalContext must be used within a GlobalProvider');
    }
    return context;
};
