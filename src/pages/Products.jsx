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
  const { cart } = useCartContext()
  const [page, setPage] = useState()
  const [url, setUrl] = useState(``);
  const [newUrl, setNewUrl] = useState('')
  const { data, loading } = Fetch(url || newUrl);
  /* ref used to locate where to scroll */
  const myRef = useRef(null);
  /*isFirstRender  motverkar att loading syns vid start */
  const [isFirstRender, setIsFirstRender] = useState(false);
  /* Scroll to top if filtering/page changes -> not if cart changes or a product is added to the cart */
  const [click, setClick] = useState(true)


  /* Check if user have a valid userId && token, if true => get cart */
  UseCheckLoginStatus()


  /* set page to 1 if searchQuery, selectedSort, selectedCategory, limit changes an totalPages to 1 if value is 0*/
  useEffect(() => {

    setPage(1)
    if (totalPages === 0) {
      setTotalPages(1)
    }

  }, [searchQuery, selectedSort, selectedCategory, limit, pickAndMix, totalPages, setTotalPages]);

  /* if states changes page is always 1 */
  useEffect(() => {

    setClick(false)
    setUrl(`sortProducts?limit=${limit}&search=${searchQuery}&sort=${selectedSort}&category=${selectedCategory}&page=1&pickAndMix=${pickAndMix}`);
  }, [limit, selectedSort, selectedCategory, pickAndMix, page, searchQuery]);

  /* if page changes this useEffect is trigged */
  useEffect(() => {
    setClick(false)
    setUrl(`sortProducts?limit=${limit}&search=${searchQuery}&sort=${selectedSort}&category=${selectedCategory}&page=${page}&pickAndMix=${pickAndMix}`);
  }, [page]);

  /* update list if cart changes */
  useEffect(() => {

    setIsFirstRender(true);
    setUrl(`sortProducts?limit=${limit}&search=${searchQuery}&sort=${selectedSort}&category=${selectedCategory}&page=${page}&pickAndMix=${pickAndMix}`);

  }, [cart]);



  /*  Update products and page data */
  useEffect(() => {
    if (data && data.products) {
      if (myRef.current && !click && !isFirstRender) {
        myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

      }
      setFiltredProducts([...data.products]);
      setUniqueCategories(data.categories);
      setTotalPages(Math.ceil(data.total / data.limit));
      setUrl('')
      setNewUrl("")
      setClick(true)
      /* Set setIsFirstRender to true here to ensure the loading state only appears after the initial load */
      setIsFirstRender(false);
    }
  }, [data, setFiltredProducts, setUniqueCategories, setTotalPages]);









  return (
    <article className="productsContainer" >

      <section className="productsContent" >

        {/* Header */}
        <ProductHeader />

        {/* Top Filter Nav */}
        <section ref={myRef} style={{ scrollMarginTop: "6rem" }}></section>
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
          {loading && !isFirstRender && url ?
            <BarLoader />
            : null}

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
              setClick={setClick}
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
