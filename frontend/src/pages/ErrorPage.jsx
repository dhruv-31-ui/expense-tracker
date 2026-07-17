import { Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-10 text-center">

                <div className="text-8xl mb-4">
                    🚫
                </div>

                <h1 className="text-6xl font-bold text-blue-600">
                    404
                </h1>

                <h2 className="text-3xl font-semibold mt-4">
                    Page Not Found
                </h2>

                <p className="text-gray-500 mt-4 leading-7">
                    Sorry, the page you're looking for doesn't exist,
                    has been moved, or the URL is incorrect.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition"
                    >
                        ← Go Back
                    </button>

                    <Link
                        to="/dashboard"
                        className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Dashboard
                    </Link>

                </div>

            </div>
        </div>
    );
};

export default ErrorPage;