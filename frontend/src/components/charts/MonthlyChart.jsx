import { useMemo } from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const MonthlyChart = ({ expenses }) => {

    /* ---------- Monthly Totals ---------- */

    const monthlyTotals = useMemo(() => {

        return expenses.reduce((totals, expense) => {

            const date = new Date(expense.createdAt);

            const month = date.toLocaleString("default", {
                month: "short",
            });

            const year = date.getFullYear();

            const key = `${month} ${year}`;

            if (!totals[key]) {
                totals[key] = 0;
            }

            totals[key] += expense.amount;

            return totals;

        }, {});

    }, [expenses]);

    /* ---------- Chart Data ---------- */

    const chartData = useMemo(() => {

        return Object.entries(monthlyTotals).map(
            ([month, total]) => ({
                month,
                total,
            })
        );

    }, [monthlyTotals]);

    return (

        <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-5">

                Monthly Expenses

            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <BarChart
                    data={chartData}
                >

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="total"
                        fill="#3B82F6"
                        radius={[8, 8, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

};

export default MonthlyChart;