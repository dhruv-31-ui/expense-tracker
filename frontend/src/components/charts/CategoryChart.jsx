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

const CategoryChart = () => {

    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategoryAnalytics();
    }, []);

    const fetchCategoryAnalytics = async () => {
        try {

            setLoading(true);

            const response =
                await analyticsService.getCategoryAnalytics();

            /*
             Backend should return:

             [
                {
                    category: "Food",
                    total: 2500
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
                No Data Available
            </div>
        );
    }

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

                    <Tooltip />

                    <Legend />

                </PieChart>
            </ResponsiveContainer>

        </div>
    );
};

export default CategoryChart;