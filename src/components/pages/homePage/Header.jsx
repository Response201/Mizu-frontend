


import { ParticleBackground } from '../../common/particleBackground/ParticleBackground.jsx';
import getAnimation from "../../../assets/lotties/button.json";
import { useEffect } from 'react';
import { MainButton } from '../../common/lottieBtn/MainBtn.jsx';


export const Header = () => {

    // Ensures the page scrolls to the top when the component is mounted
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); // Empty dependency array ensures it runs only once when the component mounts


    return (
        <article className='headerContainer'>

            <section className='headerContainer___section'>

                {/* Main header section with title and description */}
                <section className='header'>
                    <h1>Mizu <span> : skin</span></h1>

                    <p><span>  Naturla inner beauty </span>
                    Discover true radiance with products that nourish, restore, enhance, elevate, and support your natural glow. Reveal your healthiest, most vibrant skin yet.
                    </p>

                    {/* Button to navigate to the products page */}
                    <a className="hover-target" href='/products' >
                        <MainButton text="See products" getAnimation={getAnimation} />
                    </a>
                </section>


                {/* Spline viewer displaying a 3D scene */}
                <section className="spline">
                    <spline-viewer className="spline-front" url="https://prod.spline.design/8i4EwewFzI4y1f0Q/scene.splinecode"></spline-viewer>
                </section>
            </section>


            {/* Particle background component */}
            <ParticleBackground />

        </article>
    )
}
