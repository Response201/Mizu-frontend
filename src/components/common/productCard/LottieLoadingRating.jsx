import Lottie from "lottie-react";
import animation from '../../../assets/lotties/starLoading.json'

export const LottieLoadingStar = () => {


  return (
    <Lottie
      animationData={animation}
      progress={0}
      loop={true}
      autoPlay={true}
      style={{ height: '35px', width: "2rem", zIndex: '10', alignContent: 'center', justifyContent: 'center', marginTop: '1px', overflow: "hidden" }}
    />
  );
}




