import React from "react";

const ConfirmModal = ({
    isOpen,
    title = "Confirm Action",
    message = "Are you sure you want to continue?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    loading = false,
    danger = true,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">

                {/* Header */}
                <div className="border-b px-6 py-4">
                    <h2 className="text-xl font-semibold">
                        {title}
                    </h2>
                </div>

                {/* Body */}
                <div className="px-6 py-5">
                    <p className="text-gray-600">
                        {message}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t px-6 py-4">

                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-lg border px-5 py-2 hover:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={`rounded-lg px-5 py-2 text-white transition ${
                            danger
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-blue-600 hover:bg-blue-700"
                        } disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                        {loading ? "Please wait..." : confirmText}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;