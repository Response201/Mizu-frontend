import  { useState } from "react";
import ButtonLottie from "./ButtonLottie";


export const MainButton = ({ text }) => {
  const [hoverLottie, setHoverLottie] = useState(false);

  const onClickBtn = () => {
    setHoverLottie(true);
  };
  return (

      <section className="btnAndText___content" onMouseEnter={onClickBtn}>
        <ButtonLottie
          clickLottie={hoverLottie}
          setClickLottie={setHoverLottie}
        
        />

        <p className="btnAndText___content___text"> {text} </p>
      </section>

  );
};
