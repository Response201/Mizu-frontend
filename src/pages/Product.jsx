import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/productCard/ProductCard';
import { useGlobalContext } from '../context/GlobalContext';
import { useCartContext } from '../context/CartContext';
import { ParticleBackground } from '../components/particleBackground/ParticleBackground';
import { Fetch } from '../services/Fetch';
import { BarLoader } from "../components/barLoader/BarLoader"
export const Product = () => {
    const { id } = useParams();
    const { userId, error, loading } = useGlobalContext();
    const { cart,  setIsProcessing } = useCartContext()
    const [url, setUrl] = useState(`product?id=${id}`);
    const [product, setProduct] = useState([])
    const { data } = Fetch(url);



    useEffect(() => {
        if (data && data.product) {
            setProduct([...data.product])
            setUrl("");
            setIsProcessing(false)
        }
    }, [data]);


    useEffect(() => {
        setUrl(`product?id=${id}`)
    }, [cart]);





    return (
        <article className='productContainer'>
            <ParticleBackground />
            <section className='productContent'>
                {error || product.length <= 0 && !loading && <p>Something Went wrong</p>}
                <section className='productContent___cardContainer'>
                    {loading && product.length <= 0 && <BarLoader />}
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
