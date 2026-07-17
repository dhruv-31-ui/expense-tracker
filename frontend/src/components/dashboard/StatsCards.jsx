import { useEffect, useState } from "react";
import dashboardService from "../../services/dashboardService";

const StatsCards = () => {

    const [stats, setStats] = useState({
        totalAmount: 0,
        totalExpenses: 0,
        averageExpense: 0,
        highestExpense: 0,
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

            const data = response.data;

            setStats({
                totalAmount: data.totalAmount || 0,
                totalExpenses: data.totalExpenses || 0,
                averageExpense: data.averageExpense || 0,
                highestExpense: data.highestExpense || 0,
            });

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white shadow rounded-xl p-6 text-center">
                    Loading...
                </div>
            </div>
        );
    }

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            <div className="bg-white shadow rounded-xl p-6">

                <h3 className="text-gray-500">
                    Total Expenses
                </h3>

                <h2 className="text-3xl font-bold text-blue-600">
                    ₹{stats.totalAmount.toFixed(2)}
                </h2>

            </div>

            <div className="bg-white shadow rounded-xl p-6">

                <h3 className="text-gray-500">
                    Transactions
                </h3>

                <h2 className="text-3xl font-bold text-green-600">
                    {stats.totalExpenses}
                </h2>

            </div>

            <div className="bg-white shadow rounded-xl p-6">

                <h3 className="text-gray-500">
                    Average Expense
                </h3>

                <h2 className="text-3xl font-bold text-purple-600">
                    ₹{Number(stats.averageExpense).toFixed(2)}
                </h2>

            </div>

            <div className="bg-white shadow rounded-xl p-6">

                <h3 className="text-gray-500">
                    Highest Expense
                </h3>

                <h2 className="text-3xl font-bold text-red-600">
                    ₹{Number(stats.highestExpense).toFixed(2)}
                </h2>

            </div>

        </div>

    );
};

export default StatsCards;