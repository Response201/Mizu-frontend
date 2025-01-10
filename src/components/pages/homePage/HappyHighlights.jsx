

export const HappyHighlights = () => {

    const data = [
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

{data.map(item => {

return(
<div className="HappyHighlightsContent" key={item.titel}>


<h2>
{item.sub}
</h2>

<p>
 {item.titel}
</p>

</div>
)

        
})}



    </section>
  )
}
