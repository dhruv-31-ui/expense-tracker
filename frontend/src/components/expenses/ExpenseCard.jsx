import React from "react";

const ExpenseCard = ({
    expense,
    onEdit,
    onDelete,
    selected,
    onSelect,
}) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center">

            <div className="flex items-center gap-4">

                <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => onSelect(expense._id)}
                />

                <div>

                    <h2 className="text-lg font-semibold">
                        {expense.title}
                    </h2>

                    <p className="text-gray-500">
                        {expense.category}
                    </p>

                    <p className="text-sm text-gray-400">
                        {new Date(
                            expense.createdAt
                        ).toLocaleDateString()}
                    </p>

                    {expense.receipt && (
                        <img
                            src={expense.receipt}
                            alt="Receipt"
                            className="mt-3 w-24 h-24 object-cover rounded"
                        />
                    )}

                </div>

            </div>

            <div className="flex items-center gap-6">

                <h2 className="text-xl font-bold text-green-600">

                    ₹{expense.amount}

                </h2>

                <button
                    onClick={() => onEdit(expense)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(expense._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Delete
                </button>

            </div>

        </div>
    );
};

export default React.memo(ExpenseCard);