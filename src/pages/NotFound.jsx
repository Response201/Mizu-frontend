
import { useNavigate } from "react-router-dom";
import check from "../assets/lotties/404.json";
import Lottie from "lottie-react";
import { ParticleBackground } from "../components/common/particleBackground/ParticleBackground";

export const NotFound = () => {
  const navigate = useNavigate()

  // Function to handle "Go Back" button click
  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <article className='NoPage' >

      {/*  Particles background*/}
      <ParticleBackground />

      <section className='NoPageSection'>



        {/* Link styled as a button to navigate back */}
        <a onClick={handleGoBack} className="NoPageSection___linkContainer" >
          <section>     <i className="bi bi-arrow-left"></i>
            <p>    Go Back   </p>
          </section>
        </a>


        {/* Lottie animation for the 404 page */}
        <Lottie
          animationData={check}
          loop={true}
          autoPlay={true}
          className="NoPageSection___animation"
        />


      </section>
    </article>
  )
}
