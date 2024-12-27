
import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { useGlobalContext } from "../../context/GlobalContext";
import { LottieLoadingStar } from "./LottieLoadingRating";
import { Fetch } from "../../services/Fetch";


export const RatingComponent = ({ id, item, setUrl, limit=3, searchQuery="", selectedSort="averageRating:desc", selectedCategory="all", page=1, pickAndMix=false }) => {
  const [hoveredStar, setHoveredStar] = useState(null); // Tracks hovered stars
  const [currentRating, setCurrentRating] = useState(Math.ceil(item.averageRating)); // Tracks displayed rating
  const { userId, token } = useGlobalContext();
  const [body, setBody] = useState({});
  const [urlRating, setUrlRating] = useState("");
  const { data, loading, error } = Fetch(urlRating, "PUT", body);
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
    if (data && urlRating) {
      setCurrentRating(Math.round(item.averageRating));
      setTarget(null); // Clear the target after update
      setUrl(`sortProducts?limit=${limit}&search=${searchQuery}&sort=${selectedSort}&category=${selectedCategory}&page=${page}&pickAndMix=${pickAndMix}`);
    }

    setUrlRating("")
  }, [data, item, setUrlRating]);

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




  
  // Generate star elements
  const noRatingStars = Array.from({ length: 5 }, (_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={index < (currentRating) ? faStarSolid : faStarRegular}
      className="noRatingStars"
      
    />
  ));

  return (
    <section className="ratingContainer">

      {error && id === target && <p>Something went wrong</p>}

{token && userId ? <div className="stars">{stars}</div>: <div className="stars">{noRatingStars}</div>    }
      

      {loading && id === target && item ? <LottieLoadingStar /> : <p>
        {Math.round(item.averageRating * 2) / 2} {/* värde med en decimal */}
        ({item.ratings.length})   </p>}



    </section>
  );
};
