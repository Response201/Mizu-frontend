import axios from 'axios';

export const FetchLogin = async (url, bodyInput, token='') => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }), 
    };

    const options = {
      method: 'POST',
      headers,
      data: bodyInput ? JSON.stringify(bodyInput) : null,
    };

    const response = await axios({
      url: `${import.meta.env.VITE_BASE_URL}/${url}`,
      ...options,
    });
   

    return response.data;
  } catch (error) {
 
    return error;
  }
};
