import { useMemo } from "react";
import ExpenseCard from "./ExpenseCard";

const ExpenseList = ({
    expenses,
    searchTerm,
    category,
    dateRange,
    sortBy,
    onEdit,
    onDelete,
    selectedExpenseIds,
    setSelectedExpenseIds,
}) => {

    /* ---------- Filter ---------- */

    const filteredExpenses = useMemo(() => {

        return expenses.filter((expense) => {

            const matchesSearch =
                expense.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                expense.category
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesCategory =
                category === "All" ||
                expense.category === category;

            const expenseDate = new Date(expense.createdAt);

            const matchesDate =
                (!dateRange.start ||
                    expenseDate >= new Date(dateRange.start)) &&
                (!dateRange.end ||
                    expenseDate <= new Date(dateRange.end));

            return (
                matchesSearch &&
                matchesCategory &&
                matchesDate
            );

        });

    }, [
        expenses,
        searchTerm,
        category,
        dateRange,
    ]);

    /* ---------- Sort ---------- */

    const sortedExpenses = useMemo(() => {

        return [...filteredExpenses].sort((a, b) => {

            if (sortBy === "newest")
                return (
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
                );

            if (sortBy === "oldest")
                return (
                    new Date(a.createdAt) -
                    new Date(b.createdAt)
                );

            if (sortBy === "highest")
                return b.amount - a.amount;

            if (sortBy === "lowest")
                return a.amount - b.amount;

            if (sortBy === "title-asc")
                return a.title.localeCompare(b.title);

            if (sortBy === "title-desc")
                return b.title.localeCompare(a.title);

            if (sortBy === "category-asc")
                return a.category.localeCompare(b.category);

            if (sortBy === "category-desc")
                return b.category.localeCompare(a.category);

            return 0;

        });

    }, [filteredExpenses, sortBy]);

    /* ---------- Checkbox ---------- */

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

    /* ---------- Empty State ---------- */

    if (sortedExpenses.length === 0) {

        return (
            <div className="bg-white rounded-xl shadow p-8 text-center">

                <h2 className="text-xl font-semibold">

                    No Expenses Found

                </h2>

            </div>
        );

    }

    /* ---------- List ---------- */

    return (

        <div className="space-y-5">

            {sortedExpenses.map((expense) => (

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