import  { useEffect, useState } from 'react'
import { ProductCard } from '../productCard'
import { useFetch } from '../../services/useFetch'
import { useGlobalContext } from '../../context/GlobalContext';

export const TopRatedProducts = () => {
      const {  userId } = useGlobalContext();

const [url, setUrl] = useState("sortProducts?limit=3&search=&sort=averageRating:desc,price:desc")
const {data} = useFetch(url);
const [topRatedProducts, setTopRatedProducts] = useState([])



 useEffect(() => {
   
    if ( data && data.products) {
        setTopRatedProducts(data.products);
        setUrl('')
    }
    setUrl("")
  }, [data, url]);



  return (
    <article className='topRatedProductsContainer'>
        <section className='topRatedProductsContainer___text'>

        <h2>TOP RATED</h2>

<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto assumenda, magnam, voluptates. Ipsum cumque, si sint!</p>

        </section>




{topRatedProducts.length >= 1  &&
<section className="ProductCard___container">
{topRatedProducts.map((item) => (
   <ProductCard key={item._id} item={item} userId={userId}  setUrl={setUrl}   />
      ))}


</section>


}






    </article>
  )
}
