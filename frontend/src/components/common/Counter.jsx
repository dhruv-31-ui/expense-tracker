import { useState } from "react";

function Counter() {

    const [count, setCount] = useState(0);

    function increase() {

        setCount(count + 1);

    }

    return (

        <div className="p-5">

            <h1 className="text-3xl font-bold mb-4">
                {count}
            </h1>

            <button
                onClick={increase}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Increase
            </button>

        </div>

    );

}

export default Counter;