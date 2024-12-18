import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';

export const UseFetch = (url, fetchType = "GET", bodyInput = null) => {
    const { loading, setLoading, error, setError, token } = useGlobalContext();
    const [data, setData] = useState(null);

    

    useEffect(() => {
        const fetchData = async () => {

            setError(null);
            setLoading(true);

            try {
                const options = {
                    method: fetchType,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`

                    },

                    data: bodyInput ? JSON.stringify(bodyInput) : null,
                };

                const response = await axios({
                    url: `${import.meta.env.VITE_BASE_URL}/${url}`,
                    ...options,
                });

                setData(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('somthing went wrong');
                setLoading(false);
            } finally {
                setLoading(false);

            }
        };

        if (url) {
            fetchData();
        }

    }, [url, fetchType, bodyInput, setError, setLoading]);

    return { data, loading, error };
};
