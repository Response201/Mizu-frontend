import { PagesHeaderComponents } from "../../common/pagesHeaderComponent/PagesHeaderComponents";



export const PickAndMixHeader = () => {

    // Title and description for the Pick and Mix page
    const titel = `Pick and Mix - Create Your Perfect Combination!`;
    const description = `Choose one product from each category and get 10% off the total price – 
    perfect for those who love to mix and match their favorites. Prefer to choose freely? That works too, 
    but the discount won't apply. With Pick and Mix, it's easy to create a combination that suits you perfectly!`;

    // Image 
    const image = "https://i.ibb.co/dfSJHFH/Product2.png"

    return (
        // Send title, description and image to PagesHeaderComponents
        <PagesHeaderComponents titel={titel} description={description} image={image} />
    )
}
