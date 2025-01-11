

/* component creates and displays 50 animated particles  */
export const ParticleBackground = () => {
    const particleArray = []

    // Create 50 particles with alternating classes
    for (let i = 0; i < 50; i++) {
        if (i % 2 === 0) {
            particleArray.push(
                <div className={"particle particleOne"} key={i}>  </div>)
        }
        else {
            particleArray.push(
                <div className={"particle particleTwo"} key={i}>  </div>)
        }
    }
    return (
        <section className="backgroundContainer">    {/* Container for the background */}
            <section className="particle___container">
                {particleArray.map(item => item)} {/* Map through and render all particle elements */}
            </section>
        </section>
    )
}
