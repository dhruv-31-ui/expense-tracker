import { Link } from "react-router-dom";

const EmptyState = ({
    title = "No Data Found",
    description = "There is nothing to display right now.",
    buttonText = "Go to Dashboard",
    buttonLink = "/dashboard",
    icon = "📭",
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <div className="text-7xl mb-5">
                {icon}
            </div>

            <h2 className="text-3xl font-bold mb-3">
                {title}
            </h2>

            <p className="text-gray-500 leading-7 max-w-md mx-auto mb-8">
                {description}
            </p>

            <Link
                to={buttonLink}
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                {buttonText}
            </Link>

        </div>
    );
};

export default EmptyState;