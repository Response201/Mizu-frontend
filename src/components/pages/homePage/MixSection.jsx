
import getAnimation from "../../../assets/lotties/buttonOrange.json";
import { MainButton } from '../../common/lottieBtn/MainBtn.jsx';
import dots from "../../../assets/images/dotts.png"
import image from "../../../assets/images/mixhome.png"
export const MixSection = () => {
  return (
     <article className="MixSectionContainer">
               <section className="MixSectionContent">
                 
                  
       
   
             {/* Render each top-rated product as a ProductCard */}
             <section className="MixSectionImgContainer">

<section className="MixSectionImgContainer___dots"> <img src={dots} alt="dots" />          </section>


<img src={image} alt="" />


              
             </section>

             <section className="MixSection___text">
               <h2>  Pick and Mix </h2>
               <p>
                <span>Your Favorites, Your Way!</span>
Choose one product from each category and get 10% off the total price of those selected items. It’s the perfect way to mix and match your favorites while saving!

Start exploring now and create your perfect combination!</p>

<a className="MixSection___button" href="/mix">


<MainButton text="See products" getAnimation={getAnimation} />

</a>

             </section>
             





             
             </section>
           </article>
  )
}
