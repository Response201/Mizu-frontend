import { createContext, useState, useContext, useEffect } from 'react';

// Create a new context to manage global state
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [beforeFilteringProducts, setBeforeFilteringProducts] = useState(JSON.parse(localStorage.getItem("beforeFilteringProducts")) || []);
    const [filtredProducts, setFiltredProducts] = useState(JSON.parse(localStorage.getItem("beforeFilteringProducts")) || []);
    const [topRatedProducts, setTopRatedProducts] = useState(JSON.parse(localStorage.getItem("topRated")) || []);
    const [totalPages, setTotalPages] = useState(JSON.parse(localStorage.getItem("totalPages")) || "1");
    const [uniqueCategories, setUniqueCategories] = useState(JSON.parse(localStorage.getItem("uniqueCategories")) || []);
    const [allProductsList, setAllProductsList] = useState(JSON.parse(localStorage.getItem("allProductsList")) || []);
    const [pickAndmixProducts, setPickAndmixProducts] = useState(JSON.parse(localStorage.getItem("pickAndmixProducts")) || []);

    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSort, setSelectedSort] = useState("averageRating:desc");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [pickAndMix, setPickAndMix] = useState(false);
    const [limit, setLimit] = useState(9);



    // LocalStorage handling: Whenever these states change, update the corresponding LocalStorage values

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

    useEffect(() => {
        localStorage.setItem("allProductsList", JSON.stringify(allProductsList));
    }, [allProductsList]);

    useEffect(() => {
        localStorage.setItem("pickAndmixProducts", JSON.stringify(pickAndmixProducts));
    }, [pickAndmixProducts]);




    // Global state is provided to all children components that use this context
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
            limit, setLimit,
            allProductsList, setAllProductsList,
            pickAndmixProducts, setPickAndmixProducts
        }}>
            {children}
        </ProductContext.Provider>
    );
};


/* eslint-disable */
// Create custom hook to access Product Context
export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('ProductContext must be used within a ProductProvider');
    }
    return context;
};
