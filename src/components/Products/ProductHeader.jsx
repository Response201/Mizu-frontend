
import { PagesHeaderComponents } from '../pagesHeaderComponent.jsx/PagesHeaderComponents'

export const ProductHeader = () => {


const titel ="Handcrafted with Carefully Selected Ingredients";

const description = `Discover our products, lovingly handcrafted with care and dedication. 
Each item is made with carefully selected ingredients to ensure the highest quality 
and an experience that feels as genuine as it is unique.
Perfect for those who value the little extra – where every detail matters.`

const color = "rgb(25, 154, 154)" 

const image = "https://i.ibb.co/qrGk06H/12.png"
  return (
   
    <PagesHeaderComponents titel={titel} description={description}   color={color} image={image} />

  )
}
