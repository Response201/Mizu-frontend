import { PagesHeaderComponents } from "../../common/pagesHeaderComponent/PagesHeaderComponents";



export const PickAndMixHeader = () => {

    // Title and description for the Pick and Mix page
    const titel = `Pick and Mix - Create Your Perfect Combination!`;
    const description = `Choose one product from each category and get 10% off the total price – 
    perfect for those who love to mix and match their favorites. Prefer to choose freely? That works too, 
    but the discount won't apply. With Pick and Mix, it's easy to create a combination that suits you perfectly!`;

    // Image 
    const image = "https://cdn.discordapp.com/attachments/1053759995776352326/1328127331243524218/jsfrulle_Organic_moisturizer_product_with_morning_dew_drops_nat_6233484d-5b26-4f01-8391-708f98a296d2.png?ex=67859277&is=678440f7&hm=d9ec409f5c63257a881d3ea30ef54343219def03f765cc8a5baf94d0fad18f44&"

    return (
        // Send title, description and image to PagesHeaderComponents
        <PagesHeaderComponents titel={titel} description={description} image={image} />
    )
}
