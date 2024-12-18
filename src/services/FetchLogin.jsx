import axios from 'axios';


export const FetchLogin = async (url, bodyInput) => {

  try {
    const options = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
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