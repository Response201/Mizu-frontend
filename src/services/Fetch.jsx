import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';

export const Fetch = (url, fetchType = "GET", bodyInput = null) => {
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
                if (err.response && err.response.status === 403) {
                    setError("Request failed with status code 403");
                } else {
                    setError('Something went wrong');
                }
            } finally {
                setLoading(false);


            }
        };

        if (url) {
            fetchData();
        }

    }, [url]);

    return { data, loading, error };
};