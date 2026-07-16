import { useMemo } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
];

const CategoryChart = ({ expenses }) => {

    /* ---------- Category Totals ---------- */

    const categoryTotals = useMemo(() => {

        return expenses.reduce((totals, expense) => {

            if (!totals[expense.category]) {
                totals[expense.category] = 0;
            }

            totals[expense.category] += expense.amount;

            return totals;

        }, {});

    }, [expenses]);

    /* ---------- Chart Data ---------- */

    const chartData = useMemo(() => {

        return Object.entries(categoryTotals).map(
            ([category, total]) => ({
                category,
                total,
            })
        );

    }, [categoryTotals]);

    return (

        <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-5">

                Expenses by Category

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <PieChart>

                    <Pie
                        data={chartData}
                        dataKey="total"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label
                    >

                        {chartData.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={
                                    COLORS[
                                        index % COLORS.length
                                    ]
                                }
                            />

                        ))}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

};

export default CategoryChart;