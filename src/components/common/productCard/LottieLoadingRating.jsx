import Lottie from "lottie-react";
import animation from '../../../assets/lotties/starLoading.json'



/* component renders a looping star loading animation */
export const LottieLoadingStar = () => {

  return (
    <Lottie
    animationData={animation}  // Lottie animation data (loading star animation)
      progress={0}  // Set initial progress to 0
      loop={true}  // Animation will loop indefinitely
      autoPlay={true}  // Animation will autoplay as soon as it's rendered
      style={{ height: '35px', width: "2rem", zIndex: '10', alignContent: 'center', justifyContent: 'center', marginTop: '1px', overflow: "hidden" }}
    />
  );
}




