
import { useEffect, useState } from 'react';
import { useCartContext } from '../../context/CartContext'

export const Notify = () => {
  const { notify, setNotify } = useCartContext();
  const [message, setMessage] = useState(null); // Lokal state för att hantera visningen av meddelandet

  useEffect(() => {
    if (notify) {
      setMessage(notify);

      // Ta bort meddelandet efter 1 sekunder
      const timeout = setTimeout(() => {
        setNotify('')
        setMessage(null);
      }, 2000);

      return () => clearTimeout(timeout); // Rensa timeout vid avmontering eller ny uppdatering
    }
  }, [notify]); // Kör när `notify` ändras

  return (
    <section className='notifyContainer'>
      {message && (
        <p className="notifyContainer___message"><i className="bi bi-cart3"></i> </p>
      )}
    </section>
  );
};