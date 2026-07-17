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

const MonthlyChart = () => {

    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMonthlyAnalytics();
    }, []);

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

            setChartData(response.data || []);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6 h-[400px] flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!chartData.length) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6 h-[400px] flex items-center justify-center">
                No Monthly Data Available
            </div>
        );
    }

    return (

        <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-5">
                Monthly Expenses
            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <BarChart data={chartData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip
                        formatter={(value) => [
                            `₹${Number(value).toFixed(2)}`,
                            "Total",
                        ]}
                    />

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