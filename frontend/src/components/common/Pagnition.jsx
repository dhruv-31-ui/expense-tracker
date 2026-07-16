const Pagination = ({
    currentPage,
    totalPages,
    setCurrentPage,
}) => {

    const handlePrevious = () => {

        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }

    };

    const handleNext = () => {

        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }

    };

    return (

        <div className="flex justify-center items-center gap-2 mt-8">

            {/* Previous */}

            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
                Previous
            </button>

            {/* Page Numbers */}

            {Array.from(
                { length: totalPages },
                (_, index) => (

                    <button
                        key={index}
                        onClick={() =>
                            setCurrentPage(index + 1)
                        }
                        className={`px-4 py-2 rounded ${
                            currentPage === index + 1
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        {index + 1}
                    </button>

                )
            )}

            {/* Next */}

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
                Next
            </button>

        </div>

    );

};

export default Pagination;