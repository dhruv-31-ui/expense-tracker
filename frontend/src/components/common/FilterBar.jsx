const FilterBar = ({
    category,
    setCategory,
    dateRange,
    setDateRange,
}) => {

    const handleStartDate = (e) => {

        setDateRange(prev => ({
            ...prev,
            start: e.target.value,
        }));

    };

    const handleEndDate = (e) => {

        setDateRange(prev => ({
            ...prev,
            end: e.target.value,
        }));

    };

    const handleReset = () => {

        setCategory("All");

        setDateRange({
            start: "",
            end: "",
        });

    };

    return (

        <div className="bg-white shadow rounded-xl p-5 mb-6">

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                {/* Category */}

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                    className="border rounded-lg p-3"
                >
                    <option value="All">
                        All Categories
                    </option>

                    <option value="Food">
                        Food
                    </option>

                    <option value="Travel">
                        Travel
                    </option>

                    <option value="Shopping">
                        Shopping
                    </option>

                    <option value="Bills">
                        Bills
                    </option>

                    <option value="Entertainment">
                        Entertainment
                    </option>

                    <option value="Others">
                        Others
                    </option>

                </select>

                {/* Start Date */}

                <input
                    type="date"
                    value={dateRange.start}
                    onChange={handleStartDate}
                    className="border rounded-lg p-3"
                />

                {/* End Date */}

                <input
                    type="date"
                    value={dateRange.end}
                    onChange={handleEndDate}
                    className="border rounded-lg p-3"
                />

                {/* Reset */}

                <button
                    onClick={handleReset}
                    className="bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Reset Filters
                </button>

            </div>

        </div>

    );

};

export default FilterBar;