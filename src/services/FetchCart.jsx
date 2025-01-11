import axios from 'axios';



/**
 * FetchCart
 *
 * This function is used to handle API requests related to cart actions such as adding or removing products from the cart.
 * It makes a POST request to a specified URL, sending the relevant data and user token.
 * If there is an issue, such as an invalid token or stock issues (e.g., "Stock level is 0"), it handles these errors by setting error messages and displaying appropriate cart messages.
 * 
 * **Note:** This function is commonly used when the user interacts with their cart (in cartContext), such as adding products to the cart or when checking product stock.
 * 
 */ 

export const FetchCart = async (url, data, token, setError, setCartMessage) => {
  
    try {
       // Build request options
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` , // Include the Authorization token in the header
            },
            data: JSON.stringify(data), // Send data as JSON in the request
        };

     // Wait for the axios request to complete
        const response = await axios({
            url:`${import.meta.env.VITE_BASE_URL}/${url}`,
            ...options,  // Spread the options to include method, headers, and data
        });
    
         // Return response.data if the request is successful
        return response.data;


    } catch (error) {
             // Handle errors
             if (error.response) {
                if (error.response.status === 403) {
                    setError("Request failed with status code 403");  // Error 403 for unauthorized access
                } else if (error.response.data.message === 'Stock level is 0, cannot add more') {
                    setCartMessage('Stock level is 0, cannot add more.');  // Message when stock is out
                } else {
                    setError('Something went wrong');  // General error message
                }
            } else {
                setError('Network error');  // Error for network issues
            }
       
    } 
};
