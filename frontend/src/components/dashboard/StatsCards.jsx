import { useMemo } from "react";

const StatsCards = ({ expenses }) => {

    /* ---------- Total Expenses ---------- */

    const totalExpenses = useMemo(() => {

        return expenses.reduce(
            (total, expense) => total + expense.amount,
            0
        );

    }, [expenses]);

    /* ---------- Total Transactions ---------- */

    const totalTransactions = useMemo(() => {

        return expenses.length;

    }, [expenses]);

    /* ---------- Average Expense ---------- */

    const averageExpense = useMemo(() => {

        if (expenses.length === 0) return 0;

        return (totalExpenses / expenses.length).toFixed(2);

    }, [expenses, totalExpenses]);

    /* ---------- Highest Expense ---------- */

    const highestExpense = useMemo(() => {

        if (expenses.length === 0) return 0;

        return Math.max(
            ...expenses.map(expense => expense.amount)
        );

    }, [expenses]);

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            {/* Total Expense */}

            <div className="bg-white shadow rounded-xl p-6">

                <h3 className="text-gray-500">

                    Total Expenses

                </h3>

                <h2 className="text-3xl font-bold text-blue-600">

                    ₹{totalExpenses}

                </h2>

            </div>

            {/* Transactions */}

            <div className="bg-white shadow rounded-xl p-6">

                <h3 className="text-gray-500">

                    Transactions

                </h3>

                <h2 className="text-3xl font-bold text-green-600">

                    {totalTransactions}

                </h2>

            </div>

            {/* Average */}

            <div className="bg-white shadow rounded-xl p-6">

                <h3 className="text-gray-500">

                    Average Expense

                </h3>

                <h2 className="text-3xl font-bold text-purple-600">

                    ₹{averageExpense}

                </h2>

            </div>

            {/* Highest */}

            <div className="bg-white shadow rounded-xl p-6">

                <h3 className="text-gray-500">

                    Highest Expense

                </h3>

                <h2 className="text-3xl font-bold text-red-600">

                    ₹{highestExpense}

                </h2>

            </div>

        </div>

    );

};

export default StatsCards;