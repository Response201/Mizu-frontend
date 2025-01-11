import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";

const ButtonLottie = ({ clickLottie, setClickLottie, getAnimation }) => {

  const [isFirstRun, setisFirstRun] = useState(true);
  const animation = getAnimation;
  const lottieRef = useRef();


 // useEffect to stop the "new" animation from running when the mode changes
  useEffect(() => {
    lottieRef.current.goToAndStop(0, 3); // Reset animation to initial frame
    setisFirstRun(false);
  }, [animation]);

    // useEffect to trigger the animation event
  useEffect(() => {
    if (isFirstRun && !clickLottie) {
      lottieRef.current.goToAndStop(3, 3); // Set animation to a specific frame on first run
      setisFirstRun(false);
    } else {
      if (!isFirstRun && clickLottie) {
        lottieRef.current.playSegments([4, 51], true);  // Play animation segment
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
