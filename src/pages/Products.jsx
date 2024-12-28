import { useEffect, useRef, useState } from "react";
import { ProductCard } from "../components/productCard/ProductCard";
import { useGlobalContext } from "../context/GlobalContext";
import { Fetch } from "../services/Fetch";
import { FilterComponents } from "../components/Products/FilterComponents";
import { PageComponent } from "../components/Products/PageComponent";
import { useProductContext } from "../context/ProductContext";
export const Products = () => {
  const {
    userId,


  } = useGlobalContext();

  const {
    filtredProducts,
    setFiltredProducts,
    setUniqueCategories,
    totalPages,
    setTotalPages,
    searchQuery, setSearchQuery,
    selectedSort, setSelectedSort,
    selectedCategory, setSelectedCategory,
    pickAndMix, setPickAndMix,
    limit, setLimit } = useProductContext();


  const [page, setPage] = useState()
  const [url, setUrl] = useState(``);
  const [newUrl, setNewUrl] = useState('')
  const { data } = Fetch(url || newUrl);
  const myRef = useRef(null);
  /*isFirstRender  motverkar att loading syns vid start */
  const [isFirstRender, setIsFirstRender] = useState(true);




  useEffect(() => {
    setUrl(`sortProducts?limit=${limit}&search=${searchQuery}&sort=${selectedSort}&category=${selectedCategory}&page=${page}&pickAndMix=${pickAndMix}`);
  }, [limit, selectedSort, selectedCategory, pickAndMix, page, searchQuery]);


  /*  Update products and page data */
  useEffect(() => {
    if (data && data.products) {
      if (myRef.current) {
        myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setFiltredProducts([...data.products]);
      setUniqueCategories(data.categories);
      setTotalPages(Math.ceil(data.total / data.limit));
      setUrl('')
      setNewUrl("")

      /* Set setIsFirstRender to true here to ensure the loading state only appears after the initial load */
      setIsFirstRender(false);

    }
  }, [data, setFiltredProducts, setUniqueCategories, setTotalPages]);


  /* set page to 1 if searchQuery, selectedSort, selectedCategory, limit changes */
  useEffect(() => {
    setPage(1);

  }, [searchQuery, selectedSort, selectedCategory, limit]);







  return (
    <article className="productsContainer" ref={myRef}>
      <section className="productsContent">
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


        {/* Products List */}




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
