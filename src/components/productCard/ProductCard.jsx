import "@fortawesome/fontawesome-free/css/all.css";
import { useGlobalContext } from "../../context/GlobalContext";
import { RatingComponent } from "./RatingComponent";
import { useCartContext } from "../../context/CartContext";
export const ProductCard = ({ item, setUrl, limit = 3, searchQuery = "", selectedSort = "averageRating:desc", selectedCategory = "all", page = 1, pickAndMix = false, showOneProduct = false }) => {
  const { token, userId } = useGlobalContext();
  const { handleFetch, isProcessing } = useCartContext();


  /* click function => add product to cart */
  const addItemToCart = (item) => {

    handleFetch(
      userId,
      item._id,
      'add'
    );
  };


  return (
    <div className="productCard">
      <div className="card___inner" style={{ '--clr': "#fff" }}>
        <div className="box">

          {!userId && !token &&
            <p>Sign in to buy</p>}

          <div className="imgBox" style={{ '--clr-tag': `${item.primaryColor}` }}>
            <img src="https://images.unsplash.com/photo-1601049676869-702ea24cfd58?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="product" />
          </div>
          <div className="icon  " style={{ '--clr': "#fff" }}>

            {showOneProduct ?






/*add to cart if showOneProduct is true and stock level is 1 or more */
              <a onClick={ item.stockLevel >= 1 && !isProcessing && userId && token ? () => addItemToCart(item):null} 
              className={!isProcessing && item.stockLevel >= 1 ? "iconBox": "iconBox disabled--opacity"} 
              style={{ '--clr-tag': `${item.primaryColor}` }}> 
              
              <span className="material-symbols-outlined">
                {item.stockLevel >= 1 ?
                <>    {isProcessing ? '...' : <> {token && userId ? <i className="bi bi-cart3"></i> : <i className="bi bi-lock-fill"></i> }      </>  }        </>
               
               :  <i className="bi bi-x-circle "></i>}

              </span></a>









              :



/* go to product-page  */

              <a href={`/product/${item._id}`} className="iconBox " style={{ '--clr-tag': `${item.primaryColor}` }}> <span className="material-symbols-outlined">
              <i className="bi bi-arrow-up-right"></i>
              </span></a>






            }


          </div>
        </div>
      </div>
      <div className="content">
        <div className="ProductsTitleAndRatingContainer">
          <h3>  {item.name} </h3>    <section className="ratingContainer">
            <div className="stars">

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
        <p >{item.description}</p>
        <div className="categoryAndBuyBtnPrice">
          <ul>
            <li style={{ '--clr-tag': `${item.primaryColor}` }} >{item.category}</li>
            {item?.pickAndMix ? <li style={{ '--clr-tag': `${item.primaryColor}` }} >mix</li> : ""}
          </ul>
          {userId && token ?
            <>

              {item.stockLevel >= 1 ?
                <div className={!isProcessing || showOneProduct ? "categoryAndBuyBtnPrice___buyBtn_price": " categoryAndBuyBtnPrice___buyBtn_price disabled"} style={{ '--clr-tag': `${item.primaryColor}` }} onClick={!showOneProduct && !isProcessing ? () => addItemToCart(item) : null} >
                  <p> {item.price}kr </p>
                  {/* Show if cart icon if !showOneProduct  */}
                  {!showOneProduct &&
                    <> <button > <i className="bi bi-bag-plus"></i></button> </>} {item.stockLevel === 1 && <p>1 left</p>}       </div>
                :
                /* if products is Out of stock && showOneProduct is true */
                <div className="categoryAndBuyBtnPrice___buyBtn_price" style={{ '--clr-tag': `${item.primaryColor}` }}     > <p > {item.price}kr </p> <button > <p>Out of stock</p> </button>        </div>

              } </>
            :
              /* if user/token is missing */
            <div className="categoryAndBuyBtnPrice___buyBtn_price" style={{ '--clr-tag': `${item.primaryColor}` }}>  <p > {item.price}kr </p></div>}
        </div>
      </div>
    </div>
  )
}
