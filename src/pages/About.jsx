import { AboutQuote } from "../components/pages/aboutPage/AboutQuote"
import { AboutStory } from "../components/pages/aboutPage/AboutStory"


export const About = () => {







  return (
    <article className="aboutPageContainer">
      <section className="aboutPageContent">

        {/* Component displaying information about Mizu Skin */}
        <AboutStory />


        {/* Component displaying a quote and image*/}
        <AboutQuote />

      </section>







    </article>
  )
}
