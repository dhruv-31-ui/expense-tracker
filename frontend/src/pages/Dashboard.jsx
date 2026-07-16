import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpenseList";
import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import SortDropdown from "../components/common/SortDropdown";
import Pagination from "../components/common/Pagination";

import StatsCards from "../components/dashboard/StatsCards";
import BudgetCard from "../components/dashboard/BudgetCard";

import CategoryChart from "../components/charts/CategoryChart";
import MonthlyChart from "../components/charts/MonthlyChart";

import api from "../services/api";

const Dashboard = () => {

    const [expenses, setExpenses] = useState([]);

    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const [searchTerm, setSearchTerm] = useState("");

    const [category, setCategory] = useState("All");

    const [sortBy, setSortBy] = useState("newest");

    const [dateRange, setDateRange] = useState({
        start: "",
        end: ""
    });

    const fetchExpenses = async () => {

    };

    useEffect(() => {

        fetchExpenses();

    }, [currentPage]);

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-7xl mx-auto p-6">

                <StatsCards expenses={expenses} />

                <BudgetCard expenses={expenses} />

                <ExpenseForm
                    setExpenses={setExpenses}
                />

                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <FilterBar
                    category={category}
                    setCategory={setCategory}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                />

                <SortDropdown
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

                <ExpenseList
                    expenses={expenses}
                    setExpenses={setExpenses}
                    searchTerm={searchTerm}
                    category={category}
                    dateRange={dateRange}
                    sortBy={sortBy}
                />

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">

                    <CategoryChart
                        expenses={expenses}
                    />

                    <MonthlyChart
                        expenses={expenses}
                    />

                </div>

            </div>

        </div>

    );

};

export default Dashboard;