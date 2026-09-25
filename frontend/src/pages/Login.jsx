import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowUpRight, FiEye, FiEyeOff, FiLock, FiMail, FiTrendingUp } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event) => {
        setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            setError("");
            await login(formData);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "We couldn't sign you in. Check your details and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white lg:grid lg:grid-cols-2">
            <section className="relative hidden min-h-screen overflow-hidden bg-gradient-to-br from-[#17164b] via-[#302f83] to-[#6558d9] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
                <div className="pointer-events-none absolute -right-24 top-20 h-[30rem] w-[30rem] rounded-full border border-white/10" />
                <div className="pointer-events-none absolute -right-8 top-36 h-[25rem] w-[25rem] rounded-full border border-white/10" />
                <div className="pointer-events-none absolute -bottom-48 -left-32 h-[34rem] w-[34rem] rounded-full bg-indigo-400/10 blur-2xl" />
                <Link to="/login" className="relative flex w-fit items-center gap-3 text-lg font-bold tracking-tight"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15"><FiTrendingUp className="text-xl" /></span> Pennywise</Link>
                <div className="relative max-w-xl pb-8">
                    <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-indigo-200">A clearer view of your money</p>
                    <h1 className="text-5xl font-bold leading-[1.12] tracking-tight xl:text-6xl">Make every<br />rupee <span className="text-indigo-200">count.</span></h1>
                    <p className="mt-6 max-w-md text-lg leading-8 text-indigo-100/85">One calm place to understand your spending, stay on budget, and feel good about what comes next.</p>
                    <div className="mt-10 flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-300/20 text-emerald-200"><FiTrendingUp className="text-xl" /></div>
                        <div><p className="font-semibold">A little more clarity, every day</p><p className="mt-1 text-sm text-indigo-100/75">Your habits. Your goals. Your pace.</p></div>
                        <FiArrowUpRight className="ml-auto text-xl text-indigo-100" />
                    </div>
                </div>
                <p className="relative text-sm text-indigo-200/70">Your personal finance dashboard</p>
            </section>

            <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-10">
                <div className="w-full max-w-md">
                    <Link to="/login" className="mb-12 flex w-fit items-center gap-2 text-lg font-bold tracking-tight text-slate-900 lg:hidden"><span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white"><FiTrendingUp /></span>Pennywise</Link>
                    <div className="mb-9"><p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">WELCOME BACK</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Sign in to your account</h2><p className="mt-3 text-slate-500">Pick up where you left off with your finances.</p></div>

                    {error && <div role="alert" className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div><label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Email address</label><div className="relative"><FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input id="email" type="email" name="email" autoComplete="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100" required /></div></div>
                        <div><div className="mb-2 flex items-center justify-between"><label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</label></div><div className="relative"><FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input id="password" type={showPassword ? "text" : "password"} name="password" autoComplete="current-password" placeholder="Enter your password" value={formData.password} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100" required /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">{showPassword ? <FiEyeOff /> : <FiEye />}</button></div></div>
                        <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Signing in…" : "Sign in"}<FiArrowUpRight /></button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-500">New to Pennywise? <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">Create an account</Link></p>
                    <p className="mt-14 text-center text-xs text-slate-400">Securely manage your personal finances</p>
                </div>
            </section>
        </main>
    );
};

export default Login;
