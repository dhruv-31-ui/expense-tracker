import { useCallback, useEffect, useState } from "react";
import { FiArrowDownRight, FiArrowUpRight, FiPlus, FiSearch } from "react-icons/fi";
import Navbar from "../components/layout/Navbar";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseList from "../components/expenses/ExpenseList";
import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import SortDropdown from "../components/common/SortDropdown";
import Pagination from "../components/common/Pagnition";
import StatsCards from "../components/dashboard/StatsCards";
import BudgetCard from "../components/dashboard/BudgetCard";
import CategoryChart from "../components/charts/CategoryChart";
import MonthlyChart from "../components/charts/MonthlyChart";
import expenseService from "../services/expenseService";

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [selectedExpenseIds, setSelectedExpenseIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState("newest");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const [analyticsRefreshKey, setAnalyticsRefreshKey] = useState(0);

    const fetchExpenses = useCallback(async () => {
        const sortMap = {
            newest: ["date", "desc"], oldest: ["date", "asc"],
            highest: ["amount", "desc"], lowest: ["amount", "asc"],
            "title-asc": ["title", "asc"], "title-desc": ["title", "desc"],
            "category-asc": ["category", "asc"], "category-desc": ["category", "desc"],
        };
        const [sortByField, order] = sortMap[sortBy] || sortMap.newest;
        try {
            setLoading(true);
            const response = await expenseService.getExpenses({
                page: currentPage, limit: 100, sortBy: sortByField, order,
                category: category === "All" ? "" : category,
                startDate: dateRange.start, endDate: dateRange.end,
            });
            const data = response?.data || {};
            const query = searchTerm.trim().toLowerCase();
            const fetchedExpenses = data.expenses || [];
            setExpenses(query ? fetchedExpenses.filter((expense) =>
                `${expense.title} ${expense.description || ""} ${expense.category}`.toLowerCase().includes(query)
            ) : fetchedExpenses);
            setTotalPages(data.totalPages || 1);
            setAnalyticsRefreshKey((key) => key + 1);
        } catch (error) {
            console.error("Error fetching expenses:", error);
            setExpenses([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, [category, currentPage, dateRange.end, dateRange.start, searchTerm, sortBy]);

    useEffect(() => { void fetchExpenses(); }, [fetchExpenses]);

    return (
        <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
            <Navbar />
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <section className="relative mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 px-6 py-8 text-white shadow-xl shadow-indigo-200/60 sm:px-9 sm:py-10">
                    <div className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full border-[32px] border-white/10" />
                    <div className="pointer-events-none absolute right-40 -bottom-36 h-72 w-72 rounded-full border-[32px] border-white/10" />
                    <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-semibold tracking-wide text-indigo-100">YOUR MONEY, IN FOCUS</p>
                            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Your finances at a glance</h1>
                            <p className="mt-2 max-w-xl text-indigo-100">Track spending, keep your budget on course, and spot patterns as they happen.</p>
                        </div>
                        <a href="#add-expense" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-indigo-700 shadow-md transition hover:-translate-y-0.5 hover:bg-indigo-50"><FiPlus /> Add transaction</a>
                    </div>
                </section>

                <StatsCards />
                <section className="mb-8"><BudgetCard expenses={expenses} /></section>

                <section className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <CategoryChart refreshKey={analyticsRefreshKey} />
                    <MonthlyChart refreshKey={analyticsRefreshKey} />
                </section>

                <section id="add-expense" className="mb-8 scroll-mt-6">
                    <ExpenseForm fetchExpenses={fetchExpenses} editingExpense={editingExpense} setEditingExpense={setEditingExpense} />
                </section>

                <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">TRANSACTION HISTORY</p><h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Your transactions</h2><p className="mt-1 text-sm text-slate-500">Search, filter and review your recent activity.</p></div>
                        <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-500"><FiArrowUpRight /><FiArrowDownRight /> {expenses.length} shown</div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(240px,1.2fr)_2fr]">
                        <div className="relative"><FiSearch className="absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-400" /><div className="[&_input]:w-full [&_input]:rounded-xl [&_input]:border-slate-200 [&_input]:bg-slate-50 [&_input]:pl-10 [&_input]:focus:bg-white"><SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /></div></div>
                        <FilterBar category={category} setCategory={(value) => { setCategory(value); setCurrentPage(1); }} dateRange={dateRange} setDateRange={setDateRange} />
                    </div>
                    <div className="mb-5 max-w-xs"><SortDropdown sortBy={sortBy} setSortBy={setSortBy} /></div>
                    <ExpenseList expenses={expenses} loading={loading} onEdit={setEditingExpense} onDelete={fetchExpenses} selectedExpenseIds={selectedExpenseIds} setSelectedExpenseIds={setSelectedExpenseIds} />
                    <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
