import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Application Error:", error);
        console.error(errorInfo);
    }

    handleRefresh = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

                    <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-10 text-center">

                        <div className="text-7xl mb-4">
                            ⚠️
                        </div>

                        <h1 className="text-3xl font-bold mb-4">
                            Something went wrong
                        </h1>

                        <p className="text-gray-500 mb-8">
                            An unexpected error occurred.
                            Please refresh the page or try again later.
                        </p>

                        <button
                            onClick={this.handleRefresh}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                        >
                            Refresh Page
                        </button>

                    </div>

                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;