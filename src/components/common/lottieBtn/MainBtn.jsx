import { useState } from "react";
import ButtonLottie from "./ButtonLottie";


export const MainButton = ({ text, getAnimation, textColorMainBtn = "#dd912e" }) => {
  const [hoverLottie, setHoverLottie] = useState(false);

  // Triggered when the mouse enters the button to start the animation
  const onClickBtn = () => {
    setHoverLottie(true);  // Set hover state to true to play the animation
  };
  return (

    <section className="btnAndText___content" onMouseEnter={onClickBtn}>

      {/* ButtonLottie component plays animation based on hoverLottie state */}
      <ButtonLottie
        clickLottie={hoverLottie}
        setClickLottie={setHoverLottie}
        getAnimation={getAnimation}
      />
      {/* Button text with dynamic color */}
      <p style={{ '--color-mainBtn': `${textColorMainBtn}` }} className="btnAndText___content___text"> {text} </p>
    </section>

  );
};
