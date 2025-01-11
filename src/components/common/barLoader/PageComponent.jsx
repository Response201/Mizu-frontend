
import getAnimation from "../../../assets/lotties/buttonOrange.json";
import { MainButton } from "../lottieBtn/MainBtn";

export const PageComponent = ({ page, setPage, totalPages }) => {

    // Function to handle page changes (next/back)
    const handlePageChange = (action) => {
        setPage((prevPage) => {

            // Increment page if next is clicked and not at the last page
            if (action === "next" && prevPage < totalPages) return prevPage + 1;

            // Decrement page if back is clicked and not at the first page
            if (action === "back" && prevPage > 1) return prevPage - 1;

            return prevPage;
        });
    };


    return (
        <section className="productsContent___pageContainer___pageContent">

            {/* Back button */}
            <a onClick={() => handlePageChange("back")}>
                <MainButton text="Back" getAnimation={getAnimation} />  </a>

            {/* Display current page number and total pages */}
            <p>
                {page} / {totalPages}
            </p>

            {/* Next button */}
            <a onClick={() => handlePageChange("next")}>          <MainButton text="Next" getAnimation={getAnimation} />                </a>

        </section>
    )
}
