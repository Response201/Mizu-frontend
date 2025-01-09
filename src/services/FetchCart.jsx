import axios from 'axios';

// FetchCart är nu bara en vanlig funktion, utan hooks
export const FetchCart = async (url, data, token, setError, setCartMessage) => {
  
    try {
        // Bygg options för förfrågan
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` , 
            },
            data: JSON.stringify(data),
        };

        // Vänta på att axios-ansökan ska slutföras
        const response = await axios({
            url:`${import.meta.env.VITE_BASE_URL}/${url}`,
            ...options,
        });
    
        // Returnera response.data när förfrågan lyckas
        return response.data;


    } catch (error) {
        // Hantera fel
        if (error.response) {
            if (error.response.status === 403) {
                setError("Request failed with status code 403");
            } else if (error.response.data.message === 'Stock level is 0, cannot add more') {
                setCartMessage('Stock level is 0, cannot add more.');
            } else {
                setError('Something went wrong');
            }
            
        } else {
            setError('Network error');
        }
       
    } 
};
