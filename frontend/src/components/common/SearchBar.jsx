import { useEffect, useState } from "react";

const SearchBar = ({
    searchTerm,
    setSearchTerm,
}) => {

    const [input, setInput] = useState(searchTerm);

    useEffect(() => {

        const timer = setTimeout(() => {

            setSearchTerm(input);

        }, 500);

        return () => clearTimeout(timer);

    }, [input, setSearchTerm]);

    useEffect(() => {

        setInput(searchTerm);

    }, [searchTerm]);

    return (

        <div className="flex items-center gap-3 mb-6">

            <input
                type="text"
                placeholder="Search expenses..."
                value={input}
                onChange={(e) =>
                    setInput(e.target.value)
                }
                className="flex-1 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            {input && (

                <button
                    onClick={() => {
                        setInput("");
                        setSearchTerm("");
                    }}
                    className="bg-gray-200 px-4 py-3 rounded-lg hover:bg-gray-300"
                >
                    Clear
                </button>

            )}

        </div>

    );

};

export default SearchBar;