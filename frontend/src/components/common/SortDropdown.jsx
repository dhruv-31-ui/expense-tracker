const SortDropdown = ({
    sortBy,
    setSortBy,
}) => {

    return (

        <div className="bg-white rounded-xl shadow p-5 mb-6">

            <label className="block mb-2 font-semibold">

                Sort By

            </label>

            <select
                value={sortBy}
                onChange={(e) =>
                    setSortBy(e.target.value)
                }
                className="w-full border rounded-lg p-3"
            >

                <option value="newest">
                    Newest First
                </option>

                <option value="oldest">
                    Oldest First
                </option>

                <option value="highest">
                    Highest Amount
                </option>

                <option value="lowest">
                    Lowest Amount
                </option>

                <option value="title-asc">
                    Title (A-Z)
                </option>

                <option value="title-desc">
                    Title (Z-A)
                </option>

                <option value="category-asc">
                    Category (A-Z)
                </option>

                <option value="category-desc">
                    Category (Z-A)
                </option>

            </select>

        </div>

    );

};

export default SortDropdown;