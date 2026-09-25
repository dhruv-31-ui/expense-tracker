import { useEffect, useState } from "react";
import dashboardService from "../../services/dashboardService";

const StatsCards = () => {

    const [stats, setStats] = useState({
        totalAmount: 0,
        totalExpenses: 0,
        averageExpense: 0,
        monthlyExpense: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {

            setLoading(true);

            const response =
                await dashboardService.getDashboard();

            const data = response.data?.overview || {};

            setStats({
                totalAmount: data.totalExpense || 0,
                totalExpenses: data.totalTransactions || 0,
                averageExpense: data.averageExpense || 0,
                monthlyExpense: data.thisMonthExpense || 0,
            });

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:col-span-2 xl:col-span-4">
                    Loading...
                </div>
            </div>
        );
    }

    return (

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

                <h3 className="text-sm font-medium text-slate-500">
                    Total Expenses
                </h3>

                <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                    ₹{stats.totalAmount.toFixed(2)}
                </h2>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

                <h3 className="text-sm font-medium text-slate-500">
                    Transactions
                </h3>

                <h2 className="mt-3 text-2xl font-bold tracking-tight text-emerald-600">
                    {stats.totalExpenses}
                </h2>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

                <h3 className="text-sm font-medium text-slate-500">
                    Average Expense
                </h3>

                <h2 className="mt-3 text-2xl font-bold tracking-tight text-violet-600">
                    ₹{Number(stats.averageExpense).toFixed(2)}
                </h2>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

                <h3 className="text-sm font-medium text-slate-500">
                    This Month
                </h3>

                <h2 className="mt-3 text-2xl font-bold tracking-tight text-rose-600">
                    ₹{Number(stats.monthlyExpense).toFixed(2)}
                </h2>

            </div>

        </div>

    );
};

export default StatsCards;
