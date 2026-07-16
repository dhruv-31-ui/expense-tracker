import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";

const ExpenseForm = ({
    setExpenses,
    editingExpense = null,
    setEditingExpense,
}) => {
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        date: "",
    });

    const [receipt, setReceipt] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editingExpense) {
            setFormData({
                title: editingExpense.title,
                amount: editingExpense.amount,
                category: editingExpense.category,
                date: editingExpense.createdAt
                    ?.split("T")[0],
            });
        }
    }, [editingExpense]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            setReceipt(e.target.files[0]);
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            amount: "",
            category: "",
            date: "",
        });

        setReceipt(null);

        if (setEditingExpense) {
            setEditingExpense(null);
        }
    };

    const handleSubmit = async (e) => {
                e.preventDefault();

        try {
            setLoading(true);

            const data = new FormData();

            data.append("title", formData.title);
            data.append("amount", formData.amount);
            data.append("category", formData.category);
            data.append("date", formData.date);

            if (receipt) {
                data.append("image", receipt);
            }

            if (editingExpense) {

                const response = await api.put(
                    `/expenses/${editingExpense._id}`,
                    data
                );

                setExpenses((prev) =>
                    prev.map((expense) =>
                        expense._id === editingExpense._id
                            ? response.data.data
                            : expense
                    )
                );

                toast.success("Expense Updated Successfully");

            } else {

                // Optimistic UI

                const tempExpense = {
                    _id: Date.now().toString(),
                    ...formData,
                    receipt: receipt
                        ? URL.createObjectURL(receipt)
                        : null,
                };

                setExpenses((prev) => [
                    tempExpense,
                    ...prev,
                ]);

                try {

                    const response = await api.post(
                        "/expenses",
                        data
                    );

                    setExpenses((prev) =>
                        prev.map((expense) =>
                            expense._id === tempExpense._id
                                ? response.data.data
                                : expense
                        )
                    );

                    toast.success("Expense Added Successfully");

                } catch (error) {

                    // Rollback

                    setExpenses((prev) =>
                        prev.filter(
                            (expense) =>
                                expense._id !== tempExpense._id
                        )
                    );

                    toast.error(
                        error.response?.data?.message ||
                        "Failed to add expense"
                    );

                    return;
                }

            }

            resetForm();

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

                {/* Title */}

                <input
                    type="text"
                    name="title"
                    placeholder="Expense Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                {/* Amount */}

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                {/* Category */}

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

                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills</option>
                    <option value="Entertainment">
                        Entertainment
                    </option>
                    <option value="Others">
                        Others
                    </option>

                </select>

                {/* Date */}

                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                {/* Receipt */}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border rounded-lg p-3 md:col-span-2"
                />

                {/* Image Preview */}

                {receipt && (

                    <div className="md:col-span-2">

                        <img
                            src={URL.createObjectURL(receipt)}
                            alt="Receipt Preview"
                            className="w-40 h-40 object-cover rounded-lg border"
                        />

                    </div>

                )}

                {/* Buttons */}

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