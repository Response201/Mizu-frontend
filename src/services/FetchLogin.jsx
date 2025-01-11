import axios from 'axios';

/**
 * FetchLogin
 * 
 * This function handles API requests for user login or sign-up, specifically for Google Sign-in/Sign-up.
 * It sends the necessary credentials or data to the server, including a token for authenticated requests.
 * Although not directly tied to the global context, it is used in hooks like `UseCheckLoginStatus` for managing the login state.
 * 
 * **Note:** Primarily used in Google component and hook UseCheckLoginStatus.
 */

export const FetchLogin = async (url, bodyInput, token = '') => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }), // Include the Authorization token in the header
    };

    const options = {
      method: 'POST',// Use POST method 
      headers,
      data: bodyInput ? JSON.stringify(bodyInput) : null,  // Include the body data (if available)
    };

    const response = await axios({
      url: `${import.meta.env.VITE_BASE_URL}/${url}`,
      ...options, // Spread the options to include method, headers, and data
    });


    return response.data; // Return the response data if the request is successful
  } catch (error) {
    // If an error occurs, return the error object for further handling
    return error;
  }
};
