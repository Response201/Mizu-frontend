import  { useState } from "react";
import ButtonLottie from "./ButtonLottie";


export const MainButton = ({ text, getAnimation, textColorMainBtn="#dd912e" }) => {
  const [hoverLottie, setHoverLottie] = useState(false);

  const onClickBtn = () => {
    setHoverLottie(true);
  };
  return (

      <section className="btnAndText___content" onMouseEnter={onClickBtn}>
        <ButtonLottie
          clickLottie={hoverLottie}
          setClickLottie={setHoverLottie}
        getAnimation={getAnimation}
        />

        <p style={{ '--color-mainBtn': `${textColorMainBtn}` }} className="btnAndText___content___text"> {text} </p>
      </section>

  );
};
