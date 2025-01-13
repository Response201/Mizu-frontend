

export const AboutQuote = () => {
    // Quote text 
    const quote = `Nature holds the key to glowing skin. At Mizu Skin, we bring that essence to you – pure, sustainable, and handcrafted with care`

    // Image URL 
    const image = "https://cdn.discordapp.com/attachments/1053759995776352326/1328105108310855830/jsfrulle_Organic_moisturizer_product_with_morning_dew_drops_nat_00b24879-fcc5-43c9-9196-f9288fc8b31c.png?ex=67857dc4&is=67842c44&hm=cf852999f30963b6dff1e0f16651b7d51814677658696e907c4a792f261af25a&"

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
