import { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

import analyticsService from "../../services/analyticsService";

const MonthlyChart = ({ refreshKey = 0 }) => {

    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMonthlyAnalytics();
    }, [refreshKey]);

    const fetchMonthlyAnalytics = async () => {
        try {

            setLoading(true);

            const response =
                await analyticsService.getMonthlyAnalytics();

            /*
            Backend should return:

            [
                {
                    month: "Jan 2026",
                    total: 1200
                },
                {
                    month: "Feb 2026",
                    total: 3500
                }
            ]
            */

            const rows = Array.isArray(response?.data)
                ? response.data
                : Array.isArray(response)
                ? response
                : [];

            setError("");
            setChartData(rows.map((item) => {
                const monthNumber = Number(item.monthNumber || item._id?.month);
                const year = item.year || item._id?.year;
                const monthName = item.month && Number.isNaN(Number(item.month))
                    ? item.month
                    : monthNumber
                    ? new Date(2000, monthNumber - 1, 1).toLocaleString("en", { month: "short" })
                    : "Unknown";

                return {
                    month: year ? `${monthName} '${String(year).slice(-2)}` : monthName,
                    expense: Number(item.expense ?? item.total ?? 0),
                };
            }));

        } catch (error) {
            setError(error.response?.data?.message || "Could not load monthly analytics.");

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-[400px] flex items-center justify-center text-slate-500">
                Loading monthly data…
            </div>
        );
    }

    if (error) {
        return <div className="min-w-0 rounded-3xl border border-rose-100 bg-white p-6 shadow-sm h-[400px] flex flex-col items-center justify-center text-center"><p className="font-semibold text-slate-800">Monthly chart unavailable</p><p className="mt-2 text-sm text-slate-500">{error}</p></div>;
    }

    if (!chartData.length) {
        return (
            <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-[400px] flex flex-col items-center justify-center text-center"><p className="font-semibold text-slate-800">No monthly data yet</p><p className="mt-2 text-sm text-slate-500">Your monthly spending trend will appear here.</p>
            </div>
        );
    }

    return (

        <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-2"><p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Trend</p><h2 className="mt-1 text-lg font-bold text-slate-900">Monthly spending</h2></div>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <BarChart data={chartData} margin={{ top: 12, right: 12, bottom: 0, left: 4 }}>

                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />

                    <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />

                    <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} tickFormatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`} />

                    <Tooltip
                        formatter={(value) => [
                            `₹${Number(value).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`,
                            "Total",
                        ]}
                    />

                    <Bar
                        dataKey="expense"
                        fill="#6366f1"
                        barSize={36}
                        radius={[8, 8, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

};

export default MonthlyChart;
