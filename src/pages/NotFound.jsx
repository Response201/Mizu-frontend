
import { useNavigate } from "react-router-dom";
import check from "../assets/lotties/404.json";
import Lottie  from "lottie-react";
import { ParticleBackground } from "../components/common/particleBackground/ParticleBackground";

export const NotFound = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1); // Navigera tillbaka till föregående sida
  };

  return (
    <article className='NoPage' >
      <ParticleBackground />
    <section className='NoPageSection'>
    <a onClick={handleGoBack} className="NoPageSection___linkContainer" >
      <section>     <i className="bi bi-arrow-left"></i>
      <p>    Go Back   </p>
         </section>

        </a>
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
