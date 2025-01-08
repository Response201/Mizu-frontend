import { useEffect, useRef, useState } from "react";
import { ProductCard } from "../components/productCard/ProductCard";
import { useGlobalContext } from "../context/GlobalContext";
import { Fetch } from "../services/Fetch";
import { FilterComponents } from "../components/Products/FilterComponents";
import { PageComponent } from "../components/Products/PageComponent";
import { useProductContext } from "../context/ProductContext";
import noProductsImg from "../assets/images/no-products-found.png"
import { useCartContext } from "../context/CartContext";
import { UseCheckLoginStatus } from "../services/UseCheckLoginStatus";
import { ProductHeader } from "../components/Products/ProductHeader";
import { BarLoader } from "../components/barLoader/BarLoader";



export const Products = () => {
  const { userId } = useGlobalContext();
  const { filtredProducts, setFiltredProducts, setUniqueCategories, totalPages, setTotalPages, searchQuery, setSearchQuery, selectedSort, setSelectedSort, selectedCategory, setSelectedCategory, pickAndMix, setPickAndMix, limit, setLimit } = useProductContext();
  const { cart,  setIsProcessing } = useCartContext()
  const [page, setPage] = useState()
  const [url, setUrl] = useState(``);
  const [newUrl, setNewUrl] = useState('')
  const { data, loading } = Fetch(url || newUrl);



  /* ref used to locate where to scroll */
  const myRef = useRef(null);
  
  /*isFirstRender  motverkar att loading syns vid start, productCartd action eller om cart ändras */
  const [isFirstRender, setIsFirstRender] = useState(true);



   /* Check if the user has a valid userId and token. If true, fetch the cart */
  UseCheckLoginStatus();




/* 
   Update the page number to 1 if any of the following changes:
   - searchQuery, selectedSort, selectedCategory, limit
   If totalPages is 0, set totalPages to 1 to avoid errors.
*/
  useEffect(() => {

    setPage(1)
    if (totalPages === 0) {
      setTotalPages(1)
    }

  }, [searchQuery, selectedSort, selectedCategory, limit, pickAndMix, totalPages, setTotalPages]);




 /* 
  when the filtering criteria change:
   - Update the URL with the new parameters
 
*/
  useEffect(() => {

    setUrl(`sortProducts?limit=${limit}&search=${searchQuery}&sort=${selectedSort}&category=${selectedCategory}&page=1&pickAndMix=${pickAndMix}`);
  }, [limit, selectedSort, selectedCategory, pickAndMix, page, searchQuery]);



 /* 
   On page changes:
   - Update the URL with the new page
*/
  useEffect(() => {
    setUrl(`sortProducts?limit=${limit}&search=${searchQuery}&sort=${selectedSort}&category=${selectedCategory}&page=${page}&pickAndMix=${pickAndMix}`);
  }, [page]);



 /* 
   On changes to the cart:
   - Update the URL to reload the products
   - Prevent the loading indicator from showing (setIsFirstRender to true)
*/
  useEffect(() => {
    setIsFirstRender(true)
    setNewUrl(`sortProducts?limit=${limit}&search=${searchQuery}&sort=${selectedSort}&category=${selectedCategory}&page=${page}&pickAndMix=${pickAndMix}`);

  }, [cart]);


/* 
   On receiving data:
   - If ref and conditions are met, scroll to the top of the page
   - Update filtered products, unique categories, and total number of pages
   - Clear URL variables (to prevent repeated requests)
   - Reset setIsFirstRender to false to allow the loading indicator for future requests
*/
  useEffect(() => {
    if (data && data.products) {
     
      setFiltredProducts([...data.products]);
      setUniqueCategories(data.categories);
      setTotalPages(Math.ceil(data.total / data.limit));
      setUrl('')
      setNewUrl("")
      setIsFirstRender(false);
      setIsProcessing(false)
      if (myRef.current && !isFirstRender && url) {
        myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

      }

    }
  }, [data, setFiltredProducts, setUniqueCategories, setTotalPages]);









  return (
    <article className="productsContainer" >

      <section className="productsContent" >
  
        {/* Header */}
        <ProductHeader />

        {/* Ref for scroll */}
        <section ref={myRef} style={{ scrollMarginTop: "6rem" }}></section>
        {/* Top Filter Nav */}
      
        <FilterComponents
          userId={userId}
          isFirstRender={isFirstRender}
          limit={limit}
          setLimit={setLimit}
          searchQuery={searchQuery}
          selectedSort={selectedSort}
          selectedCategory={selectedCategory}
          page={page}
          setSearchQuery={setSearchQuery}
          setSelectedSort={setSelectedSort}
          setSelectedCategory={setSelectedCategory}
          pickAndMix={pickAndMix}
          setPickAndMix={setPickAndMix}
          url={url}
          setUrl={setUrl}

        />


        {/* Loading Component */}
        <section className="productsContent___topFilterNav___loading">
  
          {loading && !isFirstRender &&  url && <BarLoader />}

        </section>


        {/* Products List */}
        {filtredProducts.length <= 0 && <section className="productsContent___noProductsFound">
          <img src={noProductsImg} alt="No products found" />
        </section>}
        <section className={filtredProducts.length >= 3 ? "ProductCard___container productsContent___grid " : "ProductCard___container  productsContent___grid productsContent___smallGrid "} >
          {filtredProducts.map((item) => (
            <ProductCard
              key={`${item._id}-${item.averageRating}`}
              item={item}
              userId={userId}
              setUrl={setNewUrl}
              limit={limit}
              setLimit={setLimit}
              searchQuery={searchQuery}
              selectedSort={selectedSort}
              selectedCategory={selectedCategory}
              pickAndMix={pickAndMix}
              setPickAndMix={setPickAndMix}
              page={page}
           
            />
          ))}
        </section>


        {/* Pagination Control */}
        <section className="productsContent___pageContainer">
          <PageComponent page={page} setPage={setPage} totalPages={totalPages} />
        </section>
      </section>
    </article>
  );
};
