import { useEffect, useMemo, useState } from "react";

const BudgetCard = ({ expenses = [] }) => {

    const [budget, setBudget] = useState(() => {
        const savedBudget = localStorage.getItem("monthlyBudget");
        return savedBudget ? Number(savedBudget) : 10000;
    });

    useEffect(() => {
        localStorage.setItem("monthlyBudget", budget);
    }, [budget]);

    /* ---------- Total Expenses ---------- */

    const totalExpenses = useMemo(() => {
        return expenses.reduce(
            (total, expense) => total + Number(expense.amount),
            0
        );
    }, [expenses]);

    /* ---------- Remaining Budget ---------- */

    const remainingBudget = useMemo(() => {
        return budget - totalExpenses;
    }, [budget, totalExpenses]);

    /* ---------- Progress ---------- */

    const progress = useMemo(() => {
        if (budget <= 0) return 0;
        return (totalExpenses / budget) * 100;
    }, [budget, totalExpenses]);

    /* ---------- Status ---------- */

    const status = useMemo(() => {

        if (progress < 80) {
            return {
                text: "On Track",
                color: "text-green-600",
                bar: "bg-green-500",
            };
        }

        if (progress <= 100) {
            return {
                text: "Near Limit",
                color: "text-yellow-500",
                bar: "bg-yellow-500",
            };
        }

        return {
            text: "Over Budget",
            color: "text-red-600",
            bar: "bg-red-500",
        };

    }, [progress]);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

            <div className="flex justify-between items-center mb-5">

                <h2 className="text-2xl font-bold">
                    Budget Overview
                </h2>

                <input
                    type="number"
                    min="0"
                    value={budget}
                    onChange={(e) =>
                        setBudget(Number(e.target.value))
                    }
                    className="border rounded-lg p-2 w-40"
                    placeholder="Budget"
                />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                <div>

                    <p className="text-gray-500">
                        Total Budget
                    </p>

                    <h3 className="text-2xl font-bold">
                        ₹{budget.toFixed(2)}
                    </h3>

                </div>

                <div>

                    <p className="text-gray-500">
                        Remaining
                    </p>

                    <h3
                        className={`text-2xl font-bold ${
                            remainingBudget >= 0
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        ₹{remainingBudget.toFixed(2)}
                    </h3>

                </div>

                <div>

                    <p className="text-gray-500">
                        Status
                    </p>

                    <h3
                        className={`text-2xl font-bold ${status.color}`}
                    >
                        {status.text}
                    </h3>

                </div>

            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">

                <div
                    className={`h-4 rounded-full ${status.bar}`}
                    style={{
                        width: `${Math.min(progress, 100)}%`,
                    }}
                />

            </div>

            <p className="mt-3 text-right font-semibold">
                {progress.toFixed(1)}% Used
            </p>

        </div>
    );
};

export default BudgetCard;