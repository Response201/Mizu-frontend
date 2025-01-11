import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/common/productCard/ProductCard';
import { useGlobalContext } from '../context/GlobalContext';
import { useCartContext } from '../context/CartContext';
import { ParticleBackground } from '../components/common/particleBackground/ParticleBackground';
import { Fetch } from '../services/Fetch';
import { BarLoader } from "../components/common/barLoader/BarLoader"
export const Product = () => {
    const { id } = useParams();
    const { userId, error, loading } = useGlobalContext();
    const { cart,  setIsProcessing } = useCartContext()
    const [url, setUrl] = useState(`product?id=${id}`);
    const [product, setProduct] = useState([])
    const { data } = Fetch(url);



    useEffect(() => {
        if (data && data.product) {
            setProduct([data.product])// Store the fetched product
            setUrl(""); // Clear the URL 
            setIsProcessing(false); // Prevent multiple requests and re-enable cart actions (add, remove, delete) by setting processing to false

        } else {
           
            setProduct([]); // If no product data found, clear the product state

             }
        
    }, [data]);

 // Trigger a fetch whenever the cart changes
    useEffect(() => {
        setUrl(`product?id=${id}`)
    }, [cart]);





    return (
        <article className='productContainer'>
             {/*  Particle background */}
            <ParticleBackground />
            <section className='productContent'>
                  {/* Display error message if there is an error */}
                {error  && <p>Something Went wrong</p>}
                <section className='productContent___cardContainer'>
                       {/* Bar loader*/}
                    {loading && product.length <= 0 && <BarLoader />}


                      {/* Display product details if available */}
                    {!error && product && product.map((item) => (
                        <ProductCard
                            key={`${item._id}-${item.averageRating}`}
                            item={item}
                            userId={userId}
                            setUrl={setUrl}
                            showOneProduct={true}
                        />
                    ))}



                </section>
            </section>
        </article>
    )
}
