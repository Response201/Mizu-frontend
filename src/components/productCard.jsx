

import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { useGlobalContext } from "../context/GlobalContext";
import { useFetch } from "../services/useFetch";
import { LottieLoadingStar } from "./lottieLoadingRating";






export const RatingComponent = ({ id, item, setUrl }) => {
  const [hoveredStar, setHoveredStar] = useState(null); // Tracks hovered stars
  const [currentRating, setCurrentRating] = useState(Math.ceil(item.averageRating)); // Tracks displayed rating
  const { userId } = useGlobalContext();
  const [body, setBody] = useState({});
  const [urlRating, setUrlRating] = useState("");
  const { data, loading, error } = useFetch(urlRating, "PUT", body);
  const [target, setTarget] = useState();

  // Handle mouse hover over a star
  const handleMouseOver = (index) => setHoveredStar(index + 1);

  // Reset hover effect
  const handleMouseOut = () => setHoveredStar(null);

  // Handle click event for rating
  const handleMouseClick = async (index) => {
    const newRating = index + 1;
    setTarget(id);

    // Update rating locally for instant feedback
    setCurrentRating(newRating);

    setBody({
      id,
      userId,
      newRating,
    });
    setUrlRating("updateRating");
  };

  // Update displayed rating when data changes
  useEffect(() => {
    if (data) {
      setCurrentRating(Math.ceil(data.averageRating || item.averageRating));
      setTarget(null); // Clear the target after update
      setUrl("sortProducts?limit=3&search=&sort=averageRating:desc,price:desc");
    }
  }, [data, item.averageRating, setUrl]);

  // Generate star elements
  const stars = Array.from({ length: 5 }, (_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={index < (hoveredStar ?? currentRating) ? faStarSolid : faStarRegular}
      className="star"
      onMouseOver={() => handleMouseOver(index)}
      onMouseOut={handleMouseOut}
      onClick={() => handleMouseClick(index)}
      aria-label={`Rate ${index + 1} star`}
    />
  ));

  return (
    <section className="ratingContainer">
      
      {error && id === target && <p>Something went wrong</p>}

      
      <div className="stars">{stars}</div>
   
      {loading && id === target ?  <LottieLoadingStar /> :   <p>  {currentRating} ({item.ratings.length})   </p>}
       
      
    
    </section>
  );
};






export const ProductCard = ({ item, setUrl }) => {
  const { token, userId } = useGlobalContext();


  return (
    <div className="productCard">
      <div className="card-inner" style={{ '--clr': "#fff" }}>
        <div className="box">
          <div className="imgBox" style={{ '--clr-tag': `${item.primaryColor}` }}>
            <img src="https://images.unsplash.com/photo-1601049676869-702ea24cfd58?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Trust & Co." />
          </div>
          <div className="icon hover-target " style={{ '--clr': "#fff" }}>
            <a href="#" className="iconBox hover-target" style={{ '--clr-tag': `${item.primaryColor}` }}> <span className="material-symbols-outlined">
              {/* arrow_outward */} <i className="bi bi-arrow-up-right"></i>

            </span></a>
          </div>
        </div>
      </div>
      <div className="content">

        <div className="ProductsTitleAndRatingContainer">
          <h3>  {item.name} </h3>    <section className="ratingContainer">

            <div className="stars">
              {userId && token ? <RatingComponent item={item} inRating={item.rating} id={item._id} userId={userId} setUrl={setUrl} /> : <p className="signIn_to_shop">  Sign in to shop </p>}

            </div>
          </section>

        </div>


        <p>Fill out the form and the algorithm will offer the right team of experts</p>
        <div className="categoryAndBuyBtnPrice">
          <ul>
            <li style={{ '--clr-tag': `${item.primaryColor}` }} >{item.category}</li>
            {item?.pickAndMix ? <li style={{ '--clr-tag': `${item.primaryColor}` }} >mix</li> : ""}
          </ul>
          <div className="categoryAndBuyBtnPrice___buyBtn_price" style={{ '--clr-tag': `${item.primaryColor}` }}>       <p > {item.price}kr    </p>
            {userId && token ? <button>  <i className="bi bi-bag-plus"></i></button> : ''} </div>


        </div>
      </div>
    </div>
  )
}
