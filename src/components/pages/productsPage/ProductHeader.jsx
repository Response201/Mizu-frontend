import { PagesHeaderComponents } from "../../common/pagesHeaderComponent/PagesHeaderComponents";



export const ProductHeader = () => {

// Titel
const titel ="Handcrafted with Carefully Selected Ingredients";

    // Description
const description = `Discover our products, lovingly handcrafted with care and dedication. 
Each item is made with carefully selected ingredients to ensure the highest quality 
and an experience that feels as genuine as it is unique.
Perfect for those who value the little extra – where every detail matters.`


// Color text & border
const color = "rgb(25, 154, 154)"; 

// Image 
const image = "https://cdn.discordapp.com/attachments/1053759995776352326/1328131623509823554/jsfrulle_Organic_moisturizer_product_with_morning_dew_drops_nat_0e577d75-a363-4927-aa08-f39b4b509683.png?ex=67859676&is=678444f6&hm=8649656042ea3ac1f4c48127cd932773a413c24a09d8e2e9df974b57190f0f78&"


  return (
    // Send title, description, color and image to PagesHeaderComponents
    <PagesHeaderComponents titel={titel} description={description}   color={color} image={image} />

  )
}
