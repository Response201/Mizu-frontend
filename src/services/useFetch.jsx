import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';

export const useFetch = (url) => {
    const { setLoading, setError } = useGlobalContext();
    const [data, setData] = useState(null);
    
    useEffect(() => {
        
        
        const fetchData = async () => {
            try {
                /* aktiverar loading */
                setLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/${url}`);


                
                setData(response.data);
            } catch (err) {
                /* om något går fel sätts ett error meddelande som sedan nollställs efter 3 sek med setTimeout- funktion */
                setError(err);
                setTimeout(() => {
                    setError('')
                }, 3000);
            } finally {
                  /* avaktiverar loading - när axis slutfört anropet */
                setLoading(false);
            }
        };
       
        fetchData();
    }, [url]);

    return { data };
};
