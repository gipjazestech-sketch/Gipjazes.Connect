import { useState, useEffect } from 'react';
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
    const [serverStatus, setServerStatus] = useState('checking'); // 'checking', 'online', 'offline'

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const res = await fetch('http://127.0.0.1:5000/api/status');
                if (res.ok) setServerStatus('online');
                else setServerStatus('offline');
            } catch (_err) {
                setServerStatus('offline');
            }
        };
        checkStatus();
        const interval = setInterval(checkStatus, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const baseUrl = 'http://127.0.0.1:5000';
        const endpoint = isLogin ? `${baseUrl}/api/auth/login` : `${baseUrl}/api/auth/register`;
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
                onLogin({
                    ...data.user,
                    isPro: true,
                    profilePic: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.name}`
                });
            } else {
                setError(data.message || 'Something went wrong');
            }
        } catch (err) {
            console.error('Auth Connection Error:', err);
            setError('The world server is temporarily unreachable. Please retry shortly.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden selection:bg-yellow-200">
            {/* Radiant Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#FFD700]/10 rounded-full blur-[160px] animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#4A90E2]/10 rounded-full blur-[160px]"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[440px] relative z-10"
            >
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FFD700] to-[#FFB800] rounded-[30px] shadow-2xl shadow-yellow-500/40 mb-8 rotate-6 hover:rotate-0 transition-transform duration-700 cursor-pointer">
                        <Globe className="text-slate-900" size={40} />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter mb-3 text-slate-900">
                        Gipjazes<span className="gradient-text-gold"> Connect</span>
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Your Gateway to the Digital World</p>
                </div>

                <div className="shine-card p-10 bg-white/80 backdrop-blur-3xl border-white ring-8 ring-slate-100/50">
                    <div className="flex justify-center mb-8">
                        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${serverStatus === 'online' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                            serverStatus === 'offline' ? 'bg-rose-50 border-rose-100 text-rose-500 shadow-lg shadow-rose-100' :
                                'bg-slate-50 border-slate-100 text-slate-400'
                            }`}>
                            <div className={`w-2 h-2 rounded-full ${serverStatus === 'online' ? 'bg-emerald-500 animate-pulse' :
                                serverStatus === 'offline' ? 'bg-rose-500' : 'bg-slate-300'
                                }`}></div>
                            {serverStatus === 'online' ? 'Cloud Network Active' :
                                serverStatus === 'offline' ? 'Connection Interrupted' : 'Initializing Neural Link...'}
                        </div>
                    </div>

                    <div className="flex p-1.5 bg-slate-100/50 rounded-2xl mb-10">
                        <button
                            onClick={() => { setIsLogin(true); setError(''); }}
                            className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${isLogin ? 'bg-white shadow-xl text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => { setIsLogin(false); setError(''); }}
                            className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${!isLogin ? 'bg-white shadow-xl text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Register
                        </button>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-rose-50 border border-rose-100 text-rose-500 p-4 rounded-2xl text-[11px] font-bold mb-8 text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AnimatePresence mode="wait">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-2"
                                >
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Identity</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FFD700] transition-colors" size={20} />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#FFD700]/10 focus:bg-white focus:border-[#FFD700]/50 transition-all text-sm font-semibold"
                                            required={!isLogin}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Universal ID</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FFD700] transition-colors" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@domain.com"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#FFD700]/10 focus:bg-white focus:border-[#FFD700]/50 transition-all text-sm font-semibold"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#FFD700] transition-colors" size={20} />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••••••"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#FFD700]/10 focus:bg-white focus:border-[#FFD700]/50 transition-all text-sm font-semibold"
                                    required
                                />
                            </div>
                        </div>

                        {isLogin && (
                            <div className="flex justify-end pr-1">
                                <button type="button" className="text-[10px] text-slate-400 font-black uppercase tracking-widest hover:text-slate-900 transition-colors">Reset Access?</button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-5 rounded-[22px] btn-shine justify-center mt-6 shadow-2xl ${loading ? 'opacity-70 scale-95' : ''}`}
                        >
                            <span className={`flex items-center gap-3 transition-all ${loading ? 'opacity-0' : 'opacity-100'}`}>
                                {isLogin ? 'Initiate Link' : 'Forge Identity'} <ArrowRight size={20} />
                            </span>
                            {loading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-6 h-6 border-4 border-slate-900/10 border-t-slate-900 rounded-full animate-spin"></div>
                                </div>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                        <div className="inline-flex items-center gap-2 text-[#22c55e] font-black text-[9px] tracking-[0.2em] uppercase">
                            <ShieldCheck size={14} className="animate-pulse" /> E2E Shield Active
                        </div>
                    </div>
                </div>

                {!isLogin && (
                    <p className="text-center mt-8 text-[10px] font-black text-slate-400 uppercase tracking-widest px-8 leading-relaxed">
                        By forging a link, you agree to our <span className="text-slate-900 cursor-pointer">Global Protocols</span> and <span className="text-slate-900 cursor-pointer">Privacy Charter</span>.
                    </p>
                )}
            </motion.div>
        </div>
    );
};

export default Auth;
