import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

import analyticsService from "../../services/analyticsService";

const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#14B8A6",
    "#F97316",
    "#EC4899",
    "#6366F1",
];

const CategoryChart = ({ refreshKey = 0 }) => {

    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCategoryAnalytics();
    }, [refreshKey]);

    const fetchCategoryAnalytics = async () => {
        try {

            setLoading(true);

            const response =
                await analyticsService.getCategoryAnalytics();

            const rows = Array.isArray(response?.data)
                ? response.data
                : Array.isArray(response)
                ? response
                : [];

            setError("");
            setChartData(rows.map((item) => ({
                category: item.category || item._id || "Others",
                total: Number(item.total ?? item.totalAmount ?? 0),
            })));

        } catch (error) {
            setError(error.response?.data?.message || "Could not load category analytics.");

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-[400px] flex items-center justify-center text-slate-500">
                Loading category data…
            </div>
        );
    }

    if (error) {
        return <div className="min-w-0 rounded-3xl border border-rose-100 bg-white p-6 shadow-sm h-[400px] flex flex-col items-center justify-center text-center"><p className="font-semibold text-slate-800">Category chart unavailable</p><p className="mt-2 text-sm text-slate-500">{error}</p></div>;
    }

    if (!chartData.length) {
        return (
            <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-[400px] flex flex-col items-center justify-center text-center"><p className="font-semibold text-slate-800">No category data yet</p><p className="mt-2 text-sm text-slate-500">Add an expense to see your spending breakdown.</p>
            </div>
        );
    }

    return (
        <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-2"><p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Breakdown</p><h2 className="mt-1 text-lg font-bold text-slate-900">Spending by category</h2></div>

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
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={entry.category}
                                fill={
                                    COLORS[
                                        index %
                                            COLORS.length
                                    ]
                                }
                            />
                        ))}
                    </Pie>

                    <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`, "Total"]} />

                    <Legend />

                </PieChart>
            </ResponsiveContainer>

        </div>
    );
};

export default CategoryChart;
