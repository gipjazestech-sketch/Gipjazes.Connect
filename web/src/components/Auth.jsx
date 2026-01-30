import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

const Auth = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                // Save token & call onLogin
                localStorage.setItem('token', data.token);
                onLogin({ ...data.user, isPro: true }); // Adding isPro for demo
            } else {
                setError(data.message || 'Something went wrong');
            }
        } catch (_err) {
            setError('Failed to connect to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FF9900]/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#2F4F7F]/20 rounded-full blur-[120px]"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF9900] rounded-2xl shadow-2xl shadow-orange-500/20 mb-6 motion-safe:animate-bounce">
                        <Globe className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">
                        Gipjazes<span className="text-[#FF9900]"> Connect</span>
                    </h1>
                    <p className="text-slate-400 text-sm">Join the global heartbeat 🌐</p>
                </div>

                <div className="glass-morphism p-8">
                    <div className="flex gap-4 mb-8">
                        <button
                            onClick={() => { setIsLogin(true); setError(''); }}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${isLogin ? 'bg-[#FF9900] text-white' : 'text-slate-500 hover:text-white'}`}
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => { setIsLogin(false); setError(''); }}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!isLogin ? 'bg-[#FF9900] text-white' : 'text-slate-500 hover:text-white'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-xs font-bold mb-6 text-center animate-pulse">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <AnimatePresence mode="wait">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-2"
                                >
                                    <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF9900]/50 transition-all text-sm"
                                            required={!isLogin}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF9900]/50 transition-all text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF9900]/50 transition-all text-sm"
                                    required
                                />
                            </div>
                        </div>

                        {isLogin && (
                            <div className="flex justify-end">
                                <button type="button" className="text-[10px] text-[#FF9900] font-bold hover:underline">Forgot Password?</button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary justify-center py-4 mt-4 relative overflow-hidden group"
                        >
                            <span className={`flex items-center gap-2 transition-all ${loading ? 'opacity-0' : 'opacity-100'}`}>
                                {isLogin ? 'Enter The Hub' : 'Create Account'} <ArrowRight size={18} />
                            </span>
                            {loading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                </div>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-[10px] text-slate-500 mt-8 flex items-center justify-center gap-1">
                        <ShieldCheck size={12} className="text-[#3CB371]" /> 256-bit Encrypted Connection Active
                    </p>
                </div>

                {!isLogin && (
                    <p className="text-center mt-6 text-xs text-slate-400">
                        By signing up, you agree to our <span className="text-white cursor-pointer hover:underline">Terms of Service</span> and <span className="text-white cursor-pointer hover:underline">Privacy Policy</span>.
                    </p>
                )}
            </motion.div>
        </div>
    );
};

export default Auth;
