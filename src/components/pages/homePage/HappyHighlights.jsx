

export const HappyHighlights = () => {



  // Data array containing key statistics
  const highlights = [
    {
      titel: "Happy Customers",
      sub: "2500"
    },
    {
      titel: "Followers",
      sub: "2000"
    },
    {
      titel: "5-stars",
      sub: "1200"
    },
    {
      titel: "Recommended",
      sub: "95%"
    }
  ];



  return (


    <section className="HappyHighlightsContainer">

      {/* Loop through the data array to display each item */}
      {highlights.map(item => {

        return (
          <div className="HappyHighlightsContent" key={item.titel}>


            <h2>
              {item.sub}  {/* Display the statistic number */}
            </h2>

            <p>
              {item.titel}  {/* Display the title of the statistic */}
            </p>

          </div>
        )


      })}



    </section>
  )
}
