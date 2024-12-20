import { useEffect, useRef, useState } from "react";
import { ProductCard } from "../components/productCard/ProductCard";
import { useGlobalContext } from "../context/GlobalContext";
import { Fetch } from "../services/Fetch";
import { LottieLoadingStar } from "../components/productCard/LottieLoadingRating";

export const Products = () => {
  const { userId, allProducts, setAllProducts } = useGlobalContext();
  const [url, setUrl] = useState("sortProducts?limit=6&search=&sort=averageRating:desc,price:desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const { data, loading } = Fetch(url);

  // Create a reference to the productsContent section for scrolling
  const myRef = useRef(null);

  // UseEffect to set products and page data
  useEffect(() => {
    if (data && data.products) {
      setAllProducts([...data.products]);
      setPage(data.page);
      setTotalPages(Math.ceil(data.total / data.limit));
      setUrl("");

      // Scroll to the top of the productsContent section
      if (myRef.current) {
        myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [data, setAllProducts]);

  const HandlePage = (action) => {
    if (action === 'next' && +page < totalPages) {
      const nextPage = +page + 1;
      setUrl(`sortProducts?limit=6&search=&page=${nextPage}&sort=averageRating:desc,price:desc`);
    }
    if (action === 'back' && +page >= 2) {
      const prevPage = +page - 1;
      setUrl(`sortProducts?limit=6&search=&page=${prevPage}&sort=averageRating:desc,price:desc`);
    }
  };

  return (
    <article className="productsContainer" ref={myRef}>
      <section className="productsContent" >
 
<section >

<h1>Products</h1>

{loading && <section className="productsContent___loading"><LottieLoadingStar />   </section> }

 <section className="productsContent___FilterProductsContainer">          
 <section className="ProductCard___container productsContent___FilterProductsContainer___grid">
    
          {!loading && allProducts.map((item) => (
            <ProductCard
              key={`${item._id}-${item.averageRating}`}
              item={item}
              userId={userId}
              setUrl={setUrl}
            />
          ))}
        </section>

        <section className="productsContent___FilterProductsContainer___filterCard">

<p>hello</p>

        </section>

        </section>
</section>
       
        {/* Pagination Controls */}
        <section className="productsContent___textContainer">
          <section className="productsContent___textContainer___textContent">
            <button onClick={() => HandlePage('back')}>Tillbaka</button>
            <p>{page} / {totalPages}</p>
            <button onClick={() => HandlePage('next')}>Framåt</button>
          </section>
        </section>
      </section>
    </article>
  );
};
