
import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { useGlobalContext } from "../../context/GlobalContext";

import { LottieLoadingStar } from "./LottieLoadingRating";
import { Fetch } from "../../services/Fetch";






export const RatingComponent = ({ id, item, setUrl }) => {
  const [hoveredStar, setHoveredStar] = useState(null); // Tracks hovered stars
  const [currentRating, setCurrentRating] = useState(Math.ceil(item.averageRating)); // Tracks displayed rating
  const { userId } = useGlobalContext();
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

      {loading && id === target ? <LottieLoadingStar /> : <p>  {currentRating} ({item.ratings.length})   </p>}



    </section>
  );
};
