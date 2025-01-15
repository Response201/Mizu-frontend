import image from "../../../assets/images/aboutheader.png"

export const AboutStory = () => {


  // Title for the main section
  const titel = `Mizu Skin`


  // Story section title and content
  const storyTitel = `Our Story`

  const story = `
At Mizu Skin, we believe that your skin deserves the very best. 
Inspired by nature and rooted in sustainability, we create high-quality, 
handcrafted skincare products that not only nurture your skin but also elevate 
your self-care routine. Our journey began with a simple yet powerful idea – 
to offer products that make you feel pampered and rejuvenated, every day.
 Through careful selection of ingredients and an eye for detail, we craft skincare 
 experiences designed to leave you feeling refreshed, radiant, and cared for.
 `




  // Commitment section title and content
  const commitmentTitel = `Our Commitment`

  const commitment = `At Mizu Skin, we’re driven by a commitment to quality and sustainability.
 Every product we create is thoughtfully designed to blend the richness of natural ingredients 
 with the science of effective skincare. We strive to minimize our environmental footprint while 
 delivering exceptional results. From ethical sourcing to eco-friendly packaging, our commitment 
 extends beyond skincare – it’s a promise to care for your skin and the planet alike. 
`



  // Why Mizu Skin section title and content
  const whyMizuTitel = `Why Choose Mizu Skin?`

  const whyMizu = `Choosing Mizu Skin means embracing a philosophy of mindful self-care. 
Our products are more than just skincare – they are an invitation to slow down and indulge
 in rituals that nourish both body and mind. With carefully selected ingredients and a focus on 
 craftsmanship, we ensure each product delivers not only visible results but also a sense of luxury and 
 serenity. Discover the Mizu Skin difference and transform your daily routine into a celebration of you.`









  return (
    <section className="aboutStory">

     
      <section className="aboutStory___sideTitel">
        <h1 >
          {titel} {/* Display main title */}
        </h1>
      </section>



      <section className="aboutStory___content">
        {/* Image section */}
        <section className="aboutStory___content___image">
          <img src={image} alt="our story" /> {/* Display image  */}
        </section>


      
        <section className="aboutStory___content___storyContainer">

          <h2> {storyTitel} </h2> {/* Display story titel */}
          <p> {story} </p> {/* Display story content */}

          <h2> {commitmentTitel} </h2>  {/* Display commitment titel */}
          <p> {commitment} </p> {/* Display commitment content */}

          <h2> {whyMizuTitel} </h2> {/* Display  why Mizu titel */}
          <p> {whyMizu} </p> {/* Display why Mizu section content */}

        </section>


      </section>

    </section>
  )
}



