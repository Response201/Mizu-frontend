/* eslint-disable react/prop-types */


export const ProductCard = ({item}) => {

    
    return (
        <div className="productCard">
            <div className="card-inner" style={{ '--clr': "#fff" }}>
                <div className="box">
                    <div className="imgBox" style={{ '--clr-tag': `${item.primaryColor}` }}>
                        <img src="https://images.unsplash.com/photo-1601049676869-702ea24cfd58?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Trust & Co." />
                    </div>
                    <div className="icon hover-target " style={{ '--clr': "#fff" }}>
                        <a href="#" className="iconBox hover-target" style={{ '--clr-tag': `${item.primaryColor}` }}> <span className="material-symbols-outlined">
                            {/* arrow_outward */} <i class="bi bi-arrow-up-right"></i>

                        </span></a>
                    </div>
                </div>
            </div>
            <div className="content">
                <h3>  {item.name} </h3>
                <p>Fill out the form and the algorithm will offer the right team of experts</p>
                <ul>
                    <li style={{ '--clr-tag': `${item.primaryColor}`}} >{item.category}</li>
                    {item?.pickAndMix ?  <li style={{ '--clr-tag': `${item.primaryColor}`}} >pick and mix</li> : ""}
                </ul>
            </div>
        </div>
    )
}
