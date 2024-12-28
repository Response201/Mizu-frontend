import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    /* States as in GlobalProvider */

    const [beforeFilteringProducts, setBeforeFilteringProducts] = useState(JSON.parse(localStorage.getItem("beforeFilteringProducts")) || []);
    const [filtredProducts, setFiltredProducts] = useState(JSON.parse(localStorage.getItem("beforeFilteringProducts")) || []);
    const [topRatedProducts, setTopRatedProducts] = useState(JSON.parse(localStorage.getItem("topRated")) || []);
    const [totalPages, setTotalPages] = useState(JSON.parse(localStorage.getItem("totalPages")) || "1");
    const [uniqueCategories, setUniqueCategories] = useState(JSON.parse(localStorage.getItem("uniqueCategories")) || []);

    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSort, setSelectedSort] = useState("averageRating:desc");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [pickAndMix, setPickAndMix] = useState(false);
    const [limit, setLimit] = useState(9);

    /* LocalStorage handling for changes */
    useEffect(() => {
        localStorage.setItem("uniqueCategories", JSON.stringify(uniqueCategories));
    }, [uniqueCategories]);

    useEffect(() => {
        localStorage.setItem("totalPages", JSON.stringify(totalPages));
    }, [totalPages]);

    useEffect(() => {
        localStorage.setItem("beforeFilteringProducts", JSON.stringify(beforeFilteringProducts));
    }, [beforeFilteringProducts]);

    useEffect(() => {
        localStorage.setItem("topRated", JSON.stringify(topRatedProducts));
    }, [topRatedProducts]);

  


    /* States sent to all children within context */
    return (
        <ProductContext.Provider value={{
            beforeFilteringProducts, setBeforeFilteringProducts,
            filtredProducts, setFiltredProducts,
            totalPages, setTotalPages,
            topRatedProducts, setTopRatedProducts,
            uniqueCategories, setUniqueCategories,
            page, setPage,
            searchQuery, setSearchQuery,
            selectedSort, setSelectedSort,
            selectedCategory, setSelectedCategory,
            pickAndMix, setPickAndMix,
            limit, setLimit
        }}>
            {children}
        </ProductContext.Provider>
    );
};

ProductProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

/* Custom hook that gives access to the context from GlobalContext. If the context does not exist, an error message is given */
export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('ProductContext must be used within a ProductProvider');
    }
    return context;
};
