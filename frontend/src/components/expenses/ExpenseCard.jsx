import React from "react";
import { toast } from "react-toastify";
import expenseService from "../../services/expenseService";

const ExpenseCard = ({
    expense,
    onEdit,
    onDelete,
    selected,
    onSelect,
}) => {

    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmDelete) return;

        try {

            await expenseService.deleteExpense(expense._id);

            toast.success("Expense deleted successfully");

            if (onDelete) {
                onDelete();
            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete expense"
            );

        }

    };

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
                            expense.date || expense.createdAt
                        ).toLocaleDateString()}
                    </p>

                    {expense.description && (
                        <p className="text-sm text-gray-500 mt-2">
                            {expense.description}
                        </p>
                    )}

                    <p className="text-xs text-blue-600 mt-1">
                        {expense.paymentMethod}
                    </p>

                </div>

            </div>

            <div className="flex items-center gap-6">

                <h2 className="text-xl font-bold text-green-600">
                    ₹{Number(expense.amount).toFixed(2)}
                </h2>

                <button
                    onClick={() => onEdit(expense)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Delete
                </button>

            </div>

        </div>
    );
};

export default React.memo(ExpenseCard);