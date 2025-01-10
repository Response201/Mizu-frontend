/* eslint-disable */



import { Fetch } from "../../../services/Fetch";
import { useProductContext } from "../../../context/ProductContext";

export const FilterComponents = ({
    setUrl,
    page,
    searchQuery,
    setSearchQuery,
    selectedSort,
    setSelectedSort,
    selectedCategory,
    setSelectedCategory,
    pickAndMix,
    setPickAndMix,
    limit,
    setLimit,
    isFirstRender
}) => {
    const { uniqueCategories } = useProductContext();
    const { loading } = Fetch();


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <section className="productsContent___topFilterNav" >
            <section className="productsContent___topFilterNav___content">
                <div className="overlay"></div>
                <img src="https://i.ibb.co/qrGk06H/12.png" alt="background image" />
                {/* Sorting */}
                <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                >
                    <option value="averageRating:desc">Rating: High to Low</option>
                    <option value="averageRating:asc">Rating: Low to High</option>
                    <option value="price:desc">Price: High to Low</option>
                    <option value="price:asc">Price: Low to High</option>
                </select>
                {/* Category */}
                <section>
                    <label htmlFor="categoryFilter">Category:</label>
                    <select
                        id="categoryFilter"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">All</option>
                        {uniqueCategories &&
                            uniqueCategories.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                    </select>
                </section>
                {/* Pick and Mix */}
                <section className="radioBtn">
                    <label htmlFor="pickAndMix">Pick and Mix:</label>
                    <input
                        type="checkbox"
                        checked={pickAndMix}
                        onChange={() => setPickAndMix((prev) => !prev)}
                    />
                </section>
                {/* Limit */}
                <section>
                    <label htmlFor="limitFilter">Limit</label>
                    <select
                        id="limitFilter"
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                    >
                        <option value={6}>6</option>
                        <option value={9}>9</option>
                        <option value={12}>12</option>
                    </select>
                </section>
                {/* Search */}
                <section>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </section>
            </section>
        
        </section>
    );
};
