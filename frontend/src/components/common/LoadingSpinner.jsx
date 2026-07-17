const LoadingSpinner = ({
    size = "large",
}) => {

    const spinnerSize =
        size === "small"
            ? "h-6 w-6"
            : "h-12 w-12";

    return (

        <div className="flex justify-center items-center py-10">

            <div
                className={`${spinnerSize} border-4 border-blue-500 border-t-transparent rounded-full animate-spin`}
            />

        </div>

    );

};

export default LoadingSpinner;