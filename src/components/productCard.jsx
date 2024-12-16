

import {  useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";






export const RatingComponent = ({ id, item, setUrl}) => {
  const [hoveredStar, setHoveredStar] = useState(null); // Tracks hovered stars
  const {token, userId} = useGlobalContext();

  // Handle mouse hover over a star
  const handleMouseOver = (index) => setHoveredStar(index + 1);

  // Reset hover effect
  const handleMouseOut = () => setHoveredStar(null);

  // Handle click event for rating
  const handleMouseClick = async (index) => {
    const newRating = index + 1;
   
  
    try {
        const options = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            },
            data:  JSON.stringify({"id": id, 
                "userId": userId,
            "newRating": newRating
            
            }) 
        };
        const response = await axios({
            url: `${import.meta.env.VITE_BASE_URL}/updateRating`,
            ...options,  
        });

  if(response){

    setUrl("sortProducts?limit=3&search=&sort=averageRating:desc,price:desc")

  }
    
    } catch (err) {
        console.error(err);
       
    } 

  };

  // Generate star elements
  const stars = Array.from({ length: 5 }, (_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={index < (hoveredStar ?? item.averageRating) ? faStarSolid : faStarRegular}
      className="star"
      onMouseOver={() => handleMouseOver(index)}
      onMouseOut={handleMouseOut}
      onClick={() => handleMouseClick(index)}
      aria-label={`Rate ${index + 1} star`}
    />
  ));

  return (
    <section className="ratingContainer">
      <div className="stars">{stars} </div>
      <p> {item.averageRating} ({item.ratings.length}) </p>
    </section>
  );
};








export const ProductCard = ({item,  setUrl}) => {
  const {token, userId} = useGlobalContext();

    
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
        {userId && token ? <RatingComponent item={item} inRating={item.rating} id={item._id} userId={userId} setUrl={setUrl}  /> : <p className="signIn_to_shop">  Sign in to shop </p> }
      
      </div>
    </section>

    </div>


                <p>Fill out the form and the algorithm will offer the right team of experts</p>
                <div className="categoryAndBuyBtnPrice">        
                <ul>
                    <li style={{ '--clr-tag': `${item.primaryColor}`}} >{item.category}</li>
                    {item?.pickAndMix ?  <li style={{ '--clr-tag': `${item.primaryColor}`}} >mix</li> : ""}
                </ul>
                <div className="categoryAndBuyBtnPrice___buyBtn_price" style={{ '--clr-tag': `${item.primaryColor}`}}>       <p > {item.price}kr    </p>
                {userId && token ?  <button>  <i className="bi bi-bag-plus"></i></button> :  ''   } </div> 

                
                </div>
            </div>
        </div>
    )
}
