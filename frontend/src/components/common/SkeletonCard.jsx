const SkeletonCard = ({ count = 5 }) => {
    return (
        <div className="space-y-5">

            {Array.from({ length: count }).map((_, index) => (

                <div
                    key={index}
                    className="bg-white rounded-xl shadow-md p-5 animate-pulse"
                >

                    <div className="flex justify-between">

                        <div className="space-y-3">

                            <div className="h-5 w-40 bg-gray-300 rounded"></div>

                            <div className="h-4 w-24 bg-gray-200 rounded"></div>

                            <div className="h-4 w-20 bg-gray-200 rounded"></div>

                        </div>

                        <div className="space-y-3 text-right">

                            <div className="h-6 w-24 bg-gray-300 rounded"></div>

                            <div className="flex gap-3">

                                <div className="h-10 w-20 bg-yellow-300 rounded"></div>

                                <div className="h-10 w-20 bg-red-300 rounded"></div>

                            </div>

                        </div>

                    </div>

                </div>

            ))}

        </div>
    );
};

export default SkeletonCard;