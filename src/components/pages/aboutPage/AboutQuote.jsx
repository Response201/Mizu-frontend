import image from "../../../assets/images/aboutsubheader.png"

export const AboutQuote = () => {
    // Quote text 
    const quote = `Nature holds the key to glowing skin. At Mizu Skin, we bring that essence to you – pure, sustainable, and handcrafted with care`

   

    return (
        <section className='AboutQuote'>



            {/* Section for displaying the quote */}
            <section className='AboutQuote___quote' >
                <h2 >
                    {quote} {/* Display the quote */}
                </h2>
            </section>




            {/* Section for displaying the related image */}
            <section className="AboutQuote___image">
                <img src={image} alt="quote related" /> {/* Display the image related to the quote */}
            </section>



        </section>
    )
}
