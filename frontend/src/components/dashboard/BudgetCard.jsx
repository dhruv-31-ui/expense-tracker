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
        return expenses.reduce((total, expense) => (
            expense.category === "Salary"
                ? total
                : total + Number(expense.amount || 0)
        ), 0);
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
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

            <div className="flex justify-between items-center mb-5">

                <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">MONTHLY PLAN</p><h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">Budget overview</h2></div>

                <input
                    type="number"
                    min="0"
                    value={budget}
                    onChange={(e) =>
                        setBudget(Number(e.target.value))
                    }
                    aria-label="Monthly budget"
                    className="w-40 rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
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
