



/* display a page header with a title, description, and an optional image -  allows customization of the title, description, text color, and image source */

export const PagesHeaderComponents = ({ titel, description, color = "#dd912e", image = "https://i.ibb.co/dfSJHFH/Product2.png" }) => {


    return (
        <section className="pagesHeaderComponents">



            {/* Title and Description Section */}
            <section className='pagesHeaderComponents___titleAndDescriptionContainer' style={{ '--color': `${color}` }}>
                {/* Title */}
                <h1 className='pagesHeaderComponents___titleAndDescriptionContainer___titel' >{titel}</h1>
                {/* Description */}
                <p className='pagesHeaderComponents___titleAndDescriptionContainer___description' >{description}</p>
            </section>



            {/* Image Section */}
            <section className="pagesHeaderComponents___imageContainer" style={{ '--color': `${color}` }}>
                {/* Image displayed with the given URL */}
                <img src={image} alt="header" />
            </section>



        </section>
    )
}
