import "@fortawesome/fontawesome-free/css/all.css";
import { useGlobalContext } from "../../../context/GlobalContext";
import { RatingComponent } from "./RatingComponent";
import { useCartContext } from "../../../context/CartContext";
export const ProductCard = ({ item, setUrl, limit = 3, searchQuery = "", selectedSort = "averageRating:desc", selectedCategory = "all", page = 1, pickAndMix = false, showOneProduct = false }) => {
  const { token, userId } = useGlobalContext();
  const { handleFetch, isProcessing } = useCartContext();


  /* Click function to add product to cart. The 'true' value triggers a notification-message <Notify /> */
  const addItemToCart = (item) => {
    handleFetch(
      userId,
      item._id,
      'add'
      , true
    );
  };


  return (
    <div className="productCard" style={{ '--clr-tag': `${item.primaryColor}` }}>
      <div className="card___inner" style={{ '--clr': "#fff" }}>
        <div className="box"  style={{ '--clr-tag': `${item.primaryColor}` }}>

          {/* Display if user is not logged in */}
          {!userId && !token &&
            <p>Sign in to buy</p>}

          {/* Display product image */}
          <div className="imgBox" style={{ '--clr-tag': `${item.primaryColor}` }}>
            <img src={item.image} alt="product" />
          </div>
          <div className="icon  " style={{ '--clr': "#fff" }}>

            {showOneProduct ?



              /*add to cart if showOneProduct is true and stock level is 1 or more */
              <a onClick={item.stockLevel >= 1 && !isProcessing && userId && token ? () => addItemToCart(item) : null}
                className={!isProcessing && item.stockLevel >= 1 ? "iconBox" : "iconBox disabled--opacity"}
                style={{ '--clr-tag': `${item.primaryColor}` }}>

                <span className="material-symbols-outlined">
                  {item.stockLevel >= 1 ?
                    <>    {isProcessing ? '...' : <> {token && userId ? <i className="bi bi-cart3"></i> : <i className="bi bi-lock-fill"></i>}      </>}        </>

                    : <i className="bi bi-x-circle "></i>}

                </span></a>


              :


              /* Go to product page if showOneProduct is false */
              <a href={`/product/${item._id}`} className="iconBox " style={{ '--clr-tag': `${item.primaryColor}` }}> <span className="material-symbols-outlined">
                <i className="bi bi-arrow-up-right"></i>
              </span></a>



            }


          </div>
        </div>
      </div>
      <div className="content" style={{ '--clr-tag': `${item.primaryColor}` }}>
        <div className="ProductsTitleAndRatingContainer">
          <h3>  {item.name} </h3>    <section className="ratingContainer">
            <div className="stars">


              {/* rating component  */}
              <RatingComponent
                item={item}
                inRating={item.rating}
                id={item._id}
                userId={userId}
                setUrl={setUrl}
                limit={limit}
                searchQuery={searchQuery}
                selectedSort={selectedSort}
                selectedCategory={selectedCategory}
                page={page}
                pickAndMix={pickAndMix}
                showOneProduct={showOneProduct}

              />
            </div>
          </section>
        </div>
        <p className="description" >{item.description}</p>
        <div className="categoryAndBuyBtnPrice">
          <ul>
            <li style={{ '--clr-tag': `${item.primaryColor}` }} >{item.category}</li>
            {item?.pickAndMix ? <li style={{ '--clr-tag': `${item.primaryColor}` }} >mix</li> : ""}
          </ul>



          {userId && token ?
            <>

              {/* Show product price and add to cart button if stock level is 1 or more */}
              {item.stockLevel >= 1 ?
                <div className={!isProcessing || showOneProduct ? "categoryAndBuyBtnPrice___buyBtn_price" : " categoryAndBuyBtnPrice___buyBtn_price disabled"} style={{ '--clr-tag': `${item.primaryColor}` }} onClick={!showOneProduct && !isProcessing ? () => addItemToCart(item) : null} >
                  <p> {item.price}kr </p>
                  {/* Show cart-icon if !showOneProduct  */}
                  {!showOneProduct &&
                    <> <button > <i className="bi bi-bag-plus"></i></button> </>} {item.stockLevel === 1 && <p>1 left</p>}       </div>
                :
                /* if products is out of stock && showOneProduct is true */
                <div className="categoryAndBuyBtnPrice___buyBtn_price" style={{ '--clr-tag': `${item.primaryColor}` }}     > <p > {item.price}kr </p> <button > <p>Out of stock</p> </button>        </div>

              } 
              
              </>
            :
            /* if user/token is missing */
            <div className="categoryAndBuyBtnPrice___buyBtn_price" style={{ '--clr-tag': `${item.primaryColor}` }}> 
             <p > {item.price}kr </p>
             </div>
             
             }
        </div>
      </div>
    </div>
  )
}
