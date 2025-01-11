
import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { useGlobalContext } from "../../../context/GlobalContext";
import { LottieLoadingStar } from "./LottieLoadingRating";
import { Fetch } from "../../../services/Fetch";



/* Handles product rating and displays star ratings. */

export const RatingComponent = ({ id, item, setUrl, limit = 3, searchQuery = "", selectedSort = "averageRating:desc", selectedCategory = "all", page = 1, pickAndMix = false, showOneProduct = false }) => {
  const [hoveredStar, setHoveredStar] = useState(null);  // Tracks hovered stars to display during rating hover
  const [currentRating, setCurrentRating] = useState(Math.ceil(item.averageRating)); // Tracks and displays the current rating
  const { userId, token } = useGlobalContext();
  const [body, setBody] = useState({});
  const [urlRating, setUrlRating] = useState(""); // URL for rating API endpoint
  const { data, loading, error } = Fetch(urlRating, "PUT", body);
  const [target, setTarget] = useState(); // Tracks the current rating target for status updates


  // Handle mouse hover over a star (sets the hovered star index)
  const handleMouseOver = (index) => setHoveredStar(index + 1);

  // Reset hover effect
  const handleMouseOut = () => setHoveredStar(null);

  // Handle click event for rating
  const handleMouseClick = async (index) => {
    const newRating = index + 1;
    setTarget(id);

    // Update the current rating locally for instant feedback
    setCurrentRating(newRating);

    // Prepare data for sending rating update
    setBody({
      id,
      userId,
      newRating,
    });
    setUrlRating("updateRating"); // Trigger Fetch 

  };




  // Update displayed rating when the rating data changes
  useEffect(() => {

    if (data && urlRating) {
      setCurrentRating(Math.round(item.averageRating)); // Round and update the rating display
      setTarget(null); // Clear target after the rating update


      /* url updates the parent component with the new product list or individual product details */

      //  Set URL for fetching sorted product list 
      setUrl(`sortProducts?limit=${limit}&search=${searchQuery}&sort=${selectedSort}&category=${selectedCategory}&page=${page}&pickAndMix=${pickAndMix}`);

      // If viewing a single product, update the URL to display the specific product details
      if (showOneProduct) {
        setUrl(`product?id=${item._id}`);
      }

    }

    setUrlRating("") // Reset the URL after the update
  }, [data]);





  // Generate the star elements based on the current rating or hovered rating
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




  // Generate stars when no user is logged in or if no rating is set
  const noRatingStars = Array.from({ length: 5 }, (_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={index < (currentRating) ? faStarSolid : faStarRegular}
      className="noRatingStars"

    />
  ));




  return (
    <section className="ratingContainer">

      {error && id === target && <p><i className="bi bi-x-circle "></i></p>}

      {/* Render stars based on user login status */}
      {token && userId ? <div className="stars">{stars}</div> : <div className="stars">{noRatingStars}</div>}

      {/* Show a loading animation or rating value */}
      {loading && id === target && item ? <LottieLoadingStar /> : <p>
        {Math.round(item.averageRating * 2) / 2} {/* Round to nearest 0.5 */}
        ({item.ratings.length})   </p>}  {/* Show the number of ratings */}



    </section>
  );
};
