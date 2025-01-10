

export const AboutQuote = () => {

    const quote = `Nature holds the key to glowing skin. At Mizu Skin, we bring that essence to you – pure, sustainable, and handcrafted with care`

    const image = "https://i.ibb.co/dfSJHFH/Product2.png"

    return (
        <section className='AboutQuote'>

            <section className='AboutQuote___quote' >
                <h2 >

                    {quote}


                </h2>
            </section>
            <section className="AboutQuote___image">

                <img src={image} alt="quote related" />

            </section>


        </section>
    )
}
