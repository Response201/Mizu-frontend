import { useEffect, useRef, useState } from "react";


import Lottie from "lottie-react";

const ButtonLottie = ({ clickLottie, setClickLottie, getAnimation }) => {

  const [isFirstRun, setisFirstRun] = useState(true);
  const [animation, setAnimation] = useState(getAnimation);
  const lottieRef = useRef();


  /* useEffect för att stoppa 'ny' animation ifrån att köras vid ändring av mode */
  useEffect(() => {
    lottieRef.current.goToAndStop(0, 3);
    setisFirstRun(false);
  }, [animation]);

  /* kör animation vid händelse */
  useEffect(() => {
    if (isFirstRun && !clickLottie) {
      lottieRef.current.goToAndStop(3, 3);
      setisFirstRun(false);
    } else {
      if (!isFirstRun && clickLottie) {
        lottieRef.current.playSegments([4, 51], true);
        setClickLottie(false);
      }
    }
  }, [clickLottie]);

  return (
    <Lottie
      animationData={animation}
      progress={0}
      loop={false}
      autoPlay={false}
      lottieRef={lottieRef}
      className="btnAndText___content___btn"
    />
  );
};

export default ButtonLottie;
