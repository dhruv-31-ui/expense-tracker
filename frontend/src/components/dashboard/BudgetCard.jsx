import { useMemo, useState } from "react";

const BudgetCard = ({ expenses }) => {

    const [budget, setBudget] = useState(10000);

    /* ---------- Total Expenses ---------- */

    const totalExpenses = useMemo(() => {

        return expenses.reduce(
            (total, expense) => total + expense.amount,
            0
        );

    }, [expenses]);

    /* ---------- Remaining Budget ---------- */

    const remainingBudget = useMemo(() => {

        return budget - totalExpenses;

    }, [budget, totalExpenses]);

    /* ---------- Budget Used ---------- */

    const progress = useMemo(() => {

        if (budget === 0) return 0;

        return (totalExpenses / budget) * 100;

    }, [budget, totalExpenses]);

    /* ---------- Status ---------- */

    const status = useMemo(() => {

        if (progress < 80) {

            return {
                text: "On Track",
                color: "text-green-600",
            };

        }

        if (progress <= 100) {

            return {
                text: "Near Limit",
                color: "text-yellow-500",
            };

        }

        return {
            text: "Over Budget",
            color: "text-red-600",
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
                    value={budget}
                    onChange={(e) =>
                        setBudget(Number(e.target.value))
                    }
                    className="border rounded-lg p-2 w-40"
                    placeholder="Budget"
                />

            </div>

            {/* Budget Details */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                <div>

                    <p className="text-gray-500">

                        Total Budget

                    </p>

                    <h3 className="text-2xl font-bold">

                        ₹{budget}

                    </h3>

                </div>

                <div>

                    <p className="text-gray-500">

                        Remaining

                    </p>

                    <h3 className="text-2xl font-bold">

                        ₹{remainingBudget}

                    </h3>

                </div>

                <div>

                    <p className="text-gray-500">

                        Status

                    </p>

                    <h3 className={`text-2xl font-bold ${status.color}`}>

                        {status.text}

                    </h3>

                </div>

            </div>

            {/* Progress Bar */}

            <div className="w-full bg-gray-200 rounded-full h-4">

                <div
                    className={`h-4 rounded-full ${
                        progress < 80
                            ? "bg-green-500"
                            : progress <= 100
                            ? "bg-yellow-500"
                            : "bg-red-500"
                    }`}
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