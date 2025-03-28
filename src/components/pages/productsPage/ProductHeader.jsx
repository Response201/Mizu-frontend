import { PagesHeaderComponents } from "../../common/pagesHeaderComponent/PagesHeaderComponents";

import headerImg from "../../../assets/images/productsheader.png"

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




  return (
    // Send title, description, color and image to PagesHeaderComponents
    <PagesHeaderComponents titel={titel} description={description}   color={color} image={headerImg} />

  )
}
