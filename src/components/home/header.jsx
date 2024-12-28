

import { MainButton } from '../lottieBtn/MainBtn.jsx';
import { Background } from './Background';
import getAnimation from "../../assets/lotties/button.json";
import { useEffect } from 'react';


export const Header = () => {

 useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


    return (
        <article className='headerContainer'>

            <section className='headerContainer___section'>

                <section className='header'>   <h1>Mizu <span> : skin</span></h1>

                    <p><span>  Naturla inner beauty </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, explicabo. Aspernatur tempora sunt totam consequuntur quisquam ratione !</p>
                    <a className="hover-target" href='/products' >        
<MainButton text="See products" getAnimation={getAnimation}       />
</a>
                </section>




                <section className="spline">



                    <spline-viewer className="spline-front" url="https://prod.spline.design/8i4EwewFzI4y1f0Q/scene.splinecode"></spline-viewer>

                </section>



            </section>
            <Background />

        </article>
    )
}
