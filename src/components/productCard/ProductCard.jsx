import "@fortawesome/fontawesome-free/css/all.css";
import { useGlobalContext } from "../../context/GlobalContext";
import { RatingComponent } from "./RatingComponent";
import { useCartContext } from "../../context/CartContext";
export const ProductCard = ({ item, setUrl, limit=3, searchQuery="", selectedSort= "averageRating:desc", selectedCategory="all", page=1, pickAndMix=false }) => {
  const { token, userId } = useGlobalContext();
  const {  handleFetch } = useCartContext();

  const addItemToCart = (item) => {

 
      handleFetch(
        userId,
        item._id,
      'add'
      ); 
  };


  return (
    <div className="productCard">
      <div className="card-inner" style={{ '--clr': "#fff" }}>
        <div className="box">

        {!userId && !token &&
<p>Sign in to buy</p> }

          <div className="imgBox" style={{ '--clr-tag': `${item.primaryColor}` }}>
            <img src="https://images.unsplash.com/photo-1601049676869-702ea24cfd58?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Trust & Co." />
          </div>
          <div className="icon  " style={{ '--clr': "#fff" }}>
            <a href="#" className="iconBox " style={{ '--clr-tag': `${item.primaryColor}` }}> <span className="material-symbols-outlined">
              {/* arrow_outward */} <i className="bi bi-arrow-up-right"></i>
            </span></a>
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
            
              /> 
            </div>
          </section>
        </div>
        <p>Fill out the form and the algorithm will offer the right team of experts</p>
        <div className="categoryAndBuyBtnPrice">
          <ul>
            <li style={{ '--clr-tag': `${item.primaryColor}` }} >{item.category}</li>
            {item?.pickAndMix ? <li style={{ '--clr-tag': `${item.primaryColor}` }} >mix</li> : ""}
          </ul>
          {userId && token ? 
          <div className="categoryAndBuyBtnPrice___buyBtn_price" style={{ '--clr-tag': `${item.primaryColor}` }}    onClick={() => addItemToCart(item)}  > <p > {item.price}kr </p> <button > <i className="bi bi-bag-plus"></i></button>        </div>  :   
          <div className="categoryAndBuyBtnPrice___buyBtn_price" style={{ '--clr-tag': `${item.primaryColor}` }}>  <p > {item.price}kr </p></div>   } 
        </div>
      </div>
    </div>
  )
}
