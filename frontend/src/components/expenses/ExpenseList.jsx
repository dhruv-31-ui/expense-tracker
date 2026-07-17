import ExpenseCard from "./ExpenseCard";

const ExpenseList = ({
    expenses,
    loading,
    onEdit,
    onDelete,
    selectedExpenseIds,
    setSelectedExpenseIds,
}) => {

    const handleCheckboxChange = (expenseId) => {

        setSelectedExpenseIds((prev) => {

            if (prev.includes(expenseId)) {
                return prev.filter(
                    (id) => id !== expenseId
                );
            }

            return [...prev, expenseId];

        });

    };

    if (loading) {

        return (
            <div className="bg-white rounded-xl shadow p-8 text-center">

                <h2 className="text-xl font-semibold">

                    Loading Expenses...

                </h2>

            </div>
        );

    }

    if (!expenses.length) {

        return (
            <div className="bg-white rounded-xl shadow p-8 text-center">

                <h2 className="text-xl font-semibold">

                    No Expenses Found

                </h2>

            </div>
        );

    }

    return (

        <div className="space-y-5">

            {expenses.map((expense) => (

                <ExpenseCard
                    key={expense._id}
                    expense={expense}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    selected={selectedExpenseIds.includes(expense._id)}
                    onSelect={handleCheckboxChange}
                />

            ))}

        </div>

    );

};

export default ExpenseList;