import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';



/**
 * Fetch Hook
 * 
 * This hook is used throughout the project to handle API requests.
 * It triggers whenever the `url` changes.
 * The hook validates the user by sending the token in the request header.
 * If the user's `token` is invalid, the user is logged out, and a 403 error is triggered. 
 * This error is handled in the Global Context, which clears the `userId` and `token`.
 * The hook also manages the loading state.
 * 
 * **Note:** The hook is not always triggered when the page initially loads. It is commonly used to fetch data and sometimes validate the user throughout the project.
 */




export const Fetch = (url, fetchType = "GET", bodyInput = null) => {
    const { loading, setLoading, error, setError, token } = useGlobalContext(); // Access global state
    const [data, setData] = useState(null); // State to store the response data


    // Effect runs whenever `url` changes
    useEffect(() => {

        const fetchData = async () => {
            setError(null);  // Reset any previous errors
            setLoading(true); // Set loading state to true before making the request
            try {
                const options = {
                    method: fetchType,  // HTTP method (GET, POST, etc.)
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include the Authorization token in the header

                    },

                    data: bodyInput ? JSON.stringify(bodyInput) : null, // If bodyInput is provided, stringify it

                };

                const response = await axios({
                    url: `${import.meta.env.VITE_BASE_URL}/${url}`,
                    ...options,   // Spread the options to include method, headers, and data
                });

                setData(response.data);  // Store the response data in state
                setLoading(false);  // Set loading to false after request completion

            } catch (err) {
                // Handle errors that may occur during the request
                if (err.response && err.response.status === 403) {
                    setError("Request failed with status code 403");  // Handle Unauthorized access (403 error)
                } else {
                    setError('Something went wrong');  // General error message for other issues
                }
            } finally {
                setLoading(false);  // Ensure loading is set to false when the request finishes


            }
        };

        if (url) {
            fetchData(); // Trigger the data fetch if the URL is provided
        }

    }, [url]);  // Dependency array - effect runs whenever `url` changes


    // Return the response data, loading state, and any error encountered
    return { data, loading, error };
};