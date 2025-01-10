
import getAnimation from "../../../assets/lotties/buttonOrange.json";
import { MainButton } from "../../common/lottieBtn/MainBtn";

export const PageComponent = ({ page, setPage, totalPages }) => {


    const handlePageChange = (action) => {
        setPage((prevPage) => {
            if (action === "next" && prevPage < totalPages) return prevPage + 1;
            if (action === "back" && prevPage > 1) return prevPage - 1;
            return prevPage;
        });
    };


    return (
        <section className="productsContent___pageContainer___pageContent">
            
            

<a onClick={() => handlePageChange("back")}>        
 <MainButton text="Back" getAnimation={getAnimation}  />  </a>

            <p>
                {page} / {totalPages}
            </p>
           
<a  onClick={() => handlePageChange("next")}>          <MainButton text="Next" getAnimation={getAnimation} />                </a>
          
        </section>
    )
}
