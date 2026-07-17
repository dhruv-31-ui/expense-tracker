import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import expenseService from "../../services/expenseService";

const ExpenseForm = ({
    fetchExpenses,
    editingExpense = null,
    setEditingExpense,
}) => {
    const initialState = {
        title: "",
        amount: "",
        category: "",
        paymentMethod: "UPI",
        description: "",
        date: new Date().toISOString().split("T")[0],
    };

    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editingExpense) {
            setFormData({
                title: editingExpense.title || "",
                amount: editingExpense.amount || "",
                category: editingExpense.category || "",
                paymentMethod:
                    editingExpense.paymentMethod || "UPI",
                description:
                    editingExpense.description || "",
                date:
                    editingExpense.date?.split("T")[0] ||
                    new Date().toISOString().split("T")[0],
            });
        } else {
            setFormData(initialState);
        }
    }, [editingExpense]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const resetForm = () => {
        setFormData(initialState);

        if (setEditingExpense) {
            setEditingExpense(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (editingExpense) {
                await expenseService.updateExpense(
                    editingExpense._id,
                    formData
                );

                toast.success(
                    "Expense updated successfully"
                );
            } else {
                await expenseService.createExpense(
                    formData
                );

                toast.success(
                    "Expense added successfully"
                );
            }

            resetForm();

            if (fetchExpenses) {
                fetchExpenses();
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">
                {editingExpense
                    ? "Edit Expense"
                    : "Add Expense"}
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
                <input
                    type="text"
                    name="title"
                    placeholder="Expense Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">
                        Select Category
                    </option>

                    <option value="Food">
                        Food
                    </option>

                    <option value="Travel">
                        Travel
                    </option>

                    <option value="Shopping">
                        Shopping
                    </option>

                    <option value="Bills">
                        Bills
                    </option>

                    <option value="Entertainment">
                        Entertainment
                    </option>

                    <option value="Healthcare">
                        Healthcare
                    </option>

                    <option value="Education">
                        Education
                    </option>

                    <option value="Transportation">
                        Transportation
                    </option>

                    <option value="Salary">
                        Salary
                    </option>

                    <option value="Investment">
                        Investment
                    </option>

                    <option value="Others">
                        Others
                    </option>
                </select>

                <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="Credit Card">
                        Credit Card
                    </option>
                    <option value="Debit Card">
                        Debit Card
                    </option>
                    <option value="Net Banking">
                        Net Banking
                    </option>
                    <option value="Wallet">
                        Wallet
                    </option>
                    <option value="Others">
                        Others
                    </option>
                </select>

                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border rounded-lg p-3 md:col-span-2 outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                />

                <div className="md:col-span-2 flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {loading
                            ? "Saving..."
                            : editingExpense
                            ? "Update Expense"
                            : "Add Expense"}
                    </button>

                    {editingExpense && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ExpenseForm;