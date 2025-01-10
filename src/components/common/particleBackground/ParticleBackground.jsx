export const ParticleBackground = () => {
    const particleArray = []
    for(let i= 0; i < 50; i++){
        if(i % 2 === 0){
            particleArray.push(
<div  className={"particle particleOne"} key={i}>  </div>)
        }
        else{
            particleArray.push(
                <div className={"particle particleTwo"}  key={i}>  </div> )
        }
        }
return(
<section className="backgroundContainer">          
<section className="particle___container">
{particleArray.map(item =>  item  )}
</section>
</section>
)
}
