

export const PagesHeaderComponents = ({titel, description, color="#dd912e", image="https://i.ibb.co/dfSJHFH/Product2.png"}) => {
   

    return (
        <section className="pagesHeaderComponents">


            <section className='pagesHeaderComponents___titleAndDescriptionContainer' style={{ '--color': `${color}` }}>

                <h1 className='pagesHeaderComponents___titleAndDescriptionContainer___titel' >{titel}</h1>

                <p className='pagesHeaderComponents___titleAndDescriptionContainer___description' >{description}</p>

            </section>

            <section className="pagesHeaderComponents___imageContainer" style={{ '--color': `${color}` }}>

                <img src={image} alt="header" />

            </section>

        </section>
    )
}
