import { useEffect, useState } from "react";
import { ProductCard } from "../../common/productCard/ProductCard";
import { useGlobalContext } from "../../../context/GlobalContext";
import { Fetch } from "../../../services/Fetch";
import { useProductContext } from "../../../context/ProductContext";
import { useCartContext } from "../../../context/CartContext";

export const TopRatedProducts = () => {
  const { userId } = useGlobalContext();

  const { topRatedProducts, setTopRatedProducts, setBeforeFilteringProducts,
    setTotalPages } = useProductContext();
  const { cart, setIsProcessing } = useCartContext()
  const [url, setUrl] = useState("sortProducts?limit=3&search=&sort=averageRating:desc");
  const { data } = Fetch(url);




  // When new data is fetched, update the state with the top-rated products and stop processing
  useEffect(() => {
    if (data && data.products) {
      setTopRatedProducts([...data.products]); // Set the top-rated products in the context
      setUrl("");  // Clear the URL after fetching
      setIsProcessing(false)// Prevent multiple requests and re-enable cart actions (add, remove, delete) by setting processing to false
    }
  }, [data, setTopRatedProducts, setIsProcessing]);



  // Update the URL when the cart changes (to refresh the data)
  useEffect(() => {

    setUrl("sortProducts?limit=3&search=&sort=averageRating:desc");

  }, [cart]);


  // Fetch for "beforeFilteringProducts" used in "product-page"
  const { data: topRatedData } = Fetch(
    "sortProducts?limit=9&search=&sort=averageRating:desc, price:desc&category=all"
  );



  // Set the data for "beforeFilteringProducts" and calculate the total pages
  useEffect(() => {
    if (topRatedData && topRatedData.products) {
      setBeforeFilteringProducts(topRatedData.products);  // Set the products before filtering
      setTotalPages(Math.ceil(topRatedData.total / topRatedData.limit));  // Calculate total pages based on fetched data
    }
  }, [topRatedData, setBeforeFilteringProducts, setTotalPages]);


  return (
    <>

      {/* Display the top-rated products section only if there are top-rated products */}
      {topRatedProducts.length > 0 && (
        <article className="topRatedProductsContainer">
          <section className="topRatedProductsContainer___text">
            <h2>TOP RATED</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto assumenda, magnam,
              voluptates. Ipsum cumque, si sint!
            </p>
          </section>
          

          {/* Render each top-rated product as a ProductCard */}
          <section className="ProductCard___container">
            {topRatedProducts.map((item) => (
              <ProductCard
                key={`${item._id}-${item.averageRating}`}  // Unique key for each product
                item={item}  // Pass product data to ProductCard
                userId={userId}  // Pass userId to ProductCard
                setUrl={setUrl}  // Pass the setUrl function to ProductCard
              />
            ))}
          </section>
        </article>
      )}
    </>
  );
};
