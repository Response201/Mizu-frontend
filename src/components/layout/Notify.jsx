
import { useEffect, useState } from 'react';
import { useCartContext } from '../../context/CartContext'

export const Notify = () => {
  const { notify, setNotify } = useCartContext();
  const [message, setMessage] = useState(null); // Local state to manage message visibility

  useEffect(() => {
    if (notify) {
      setMessage(notify);

      // Remove the message after 2 seconds
      const timeout = setTimeout(() => {
        setNotify('')  // Reset notify state
        setMessage(null);  // Hide the message
      }, 2000);

      return () => clearTimeout(timeout); // Clear timeout on component unmount or re-update
    }
  }, [notify]); // Run when `notify` changes

  return (
    <section className='notifyContainer'>

       {/* Display the notification icon */}
      {message && (
        <p className="notifyContainer___message"><i className="bi bi-cart3"></i> </p>   
      )}



    </section>
  );
};