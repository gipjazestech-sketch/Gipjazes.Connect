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
            setError('The spectrum server is temporarily unreachable. Please retry shortly.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden selection:bg-indigo-100">
            {/* Spectrum Background Shell */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-500/10 rounded-full blur-[160px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-500/10 rounded-full blur-[160px]"></div>
            <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[160px]"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[480px] relative z-10"
            >
                <div className="text-center mb-14">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-violet-500 via-indigo-500 to-rose-500 rounded-[32px] shadow-3xl shadow-indigo-500/30 mb-10 rotate-3 hover:rotate-0 transition-all duration-1000 cursor-pointer p-0.5">
                        <div className="w-full h-full bg-slate-900 rounded-[30px] flex items-center justify-center border-2 border-white/20">
                            <Globe className="text-white" size={44} />
                        </div>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter mb-4 text-slate-900">
                        Gipjazes<span className="gradient-text-multi italic"> Connect</span>
                    </h1>
                    <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px]">Universal Link Protocol v2.6</p>
                </div>

                <div className="shine-card p-12 bg-white/80 backdrop-blur-3xl border-none shadow-3xl ring-12 ring-slate-100/30">
                    <div className="flex justify-center mb-10">
                        <div className={`flex items-center gap-3 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${serverStatus === 'online' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                            serverStatus === 'offline' ? 'bg-rose-50 border-rose-100 text-rose-500 shadow-xl shadow-rose-100' :
                                'bg-slate-50 border-slate-100 text-slate-400'
                            }`}>
                            <div className={`w-2.5 h-2.5 rounded-full ${serverStatus === 'online' ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]' :
                                serverStatus === 'offline' ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : 'bg-slate-300'
                                }`}></div>
                            {serverStatus === 'online' ? 'Nexus Link Active' :
                                serverStatus === 'offline' ? 'Signal Interrupted' : 'Syncing Spectrum...'}
                        </div>
                    </div>

                    <div className="flex p-2 bg-slate-100/50 rounded-[24px] mb-12">
                        <button
                            onClick={() => { setIsLogin(true); setError(''); }}
                            className={`flex-1 py-4 text-[11px] font-black uppercase tracking-[0.2em] rounded-[18px] transition-all duration-500 ${isLogin ? 'bg-white shadow-2xl text-slate-900' : 'text-slate-400 hover:text-slate-700'}`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => { setIsLogin(false); setError(''); }}
                            className={`flex-1 py-4 text-[11px] font-black uppercase tracking-[0.2em] rounded-[18px] transition-all duration-500 ${!isLogin ? 'bg-white shadow-2xl text-slate-900' : 'text-slate-400 hover:text-slate-700'}`}
                        >
                            Register
                        </button>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-rose-50 border border-rose-100 text-rose-500 p-5 rounded-[24px] text-[12px] font-black mb-10 text-center uppercase tracking-tight italic"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <AnimatePresence mode="wait">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-3"
                                >
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity Tag</label>
                                    <div className="relative group">
                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-violet-500 transition-colors" size={20} />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-[24px] py-5 pl-14 pr-6 focus:outline-none focus:ring-8 focus:ring-violet-500/5 focus:bg-white focus:border-violet-500/20 transition-all text-sm font-black placeholder:text-slate-300"
                                            required={!isLogin}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Universal Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="nexus@spectrum.link"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-[24px] py-5 pl-14 pr-6 focus:outline-none focus:ring-8 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-500/20 transition-all text-sm font-black placeholder:text-slate-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Neural Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors" size={20} />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••••••"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-[24px] py-5 pl-14 pr-6 focus:outline-none focus:ring-8 focus:ring-rose-500/5 focus:bg-white focus:border-rose-500/20 transition-all text-sm font-black placeholder:text-slate-300"
                                    required
                                />
                            </div>
                        </div>

                        {isLogin && (
                            <div className="flex justify-end pr-1">
                                <button type="button" className="text-[10px] text-slate-400 font-black uppercase tracking-widest hover:text-indigo-500 transition-colors">Key Lost?</button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-6 rounded-[28px] btn-shine-multi justify-center mt-10 shadow-3xl shadow-indigo-500/20 ${loading ? 'opacity-70 scale-95' : ''}`}
                        >
                            <span className={`flex items-center gap-4 transition-all ${loading ? 'opacity-0' : 'opacity-100'}`}>
                                <span className="text-[12px] font-black italic">{isLogin ? 'AUTHORIZE LINK' : 'MANIFEST IDENTITY'}</span> <ArrowRight size={22} />
                            </span>
                            {loading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                                </div>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-10 border-t border-slate-50 text-center">
                        <div className="inline-flex items-center gap-3 text-emerald-500 font-black text-[10px] tracking-[0.3em] uppercase">
                            <ShieldCheck size={18} className="animate-pulse shadow-emerald-500/20" /> Spectrum Shield Secured
                        </div>
                    </div>
                </div>

                {!isLogin && (
                    <p className="text-center mt-12 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-12 leading-loose">
                        By forging an identity, you sanction our <span className="text-indigo-500 cursor-pointer">Global Flux Protocols</span> and <span className="text-rose-500 cursor-pointer">Neural Charter</span>.
                    </p>
                )}
            </motion.div>
        </div>
    );
};

export default Auth;
