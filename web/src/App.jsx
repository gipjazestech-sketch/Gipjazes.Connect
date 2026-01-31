import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  MessageCircle,
  Users,
  Settings,
  Bell,
  Search,
  PlusSquare,
  Plus,
  Heart,
  MessageSquare,
  Share2,
  Globe,
  Calendar,
  ShoppingBag,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';
import Auth from './components/Auth';

const Navbar = ({ setActiveTab }) => (
  <nav className="fixed top-0 left-0 right-0 h-20 nav-blur z-50 px-8 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] via-[#3B82F6] to-[#06B6D4] rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20 rotate-3">
        <Globe className="text-white" size={28} />
      </div>
      <h1 className="text-2xl font-black tracking-tight hidden md:block text-slate-900">
        Gipjazes<span className="gradient-text-multi"> Connect</span>
      </h1>
    </div>

    <div className="flex-1 max-w-lg mx-12 hidden md:block">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search the global network..."
          className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all font-medium placeholder-slate-400"
        />
      </div>
    </div>

    <div className="flex items-center gap-6">
      <button className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all relative group">
        <Bell size={22} className="text-slate-600 group-hover:text-rose-500" />
        <span className="absolute top-2 right-2 w-3 h-3 bg-rose-500 rounded-full border-2 border-white"></span>
      </button>
      <button className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all group">
        <MessageCircle size={22} className="text-slate-600 group-hover:text-indigo-500" />
      </button>
      <div className="relative group cursor-pointer hover:scale-105 transition-transform" onClick={() => setActiveTab('profile')}>
        <div className="p-0.5 rounded-2xl bg-gradient-to-tr from-[#8B5CF6] to-[#F43F5E] shadow-lg shadow-indigo-500/10">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-10 h-10 rounded-[14px] bg-white" />
        </div>
        <span className="absolute -bottom-1 -right-1 bg-slate-900 text-white text-[8px] font-black px-2 py-0.5 rounded-lg border-2 border-white uppercase tracking-tighter">Elite</span>
      </div>
    </div>
  </nav>
);

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'feed', icon: <Home size={22} />, label: 'Feed', color: 'tab-violet' },
    { id: 'groups', icon: <Users size={22} />, label: 'Groups', color: 'tab-blue' },
    { id: 'events', icon: <Calendar size={22} />, label: 'Events', color: 'tab-emerald' },
    { id: 'marketplace', icon: <ShoppingBag size={22} />, label: 'Marketplace', color: 'tab-blue' },
    { id: 'merchants', icon: <Calendar size={22} />, label: 'Merchant Hub', color: 'tab-rose' },
    { id: 'chat', icon: <ShieldCheck size={22} />, label: 'Global Chat', color: 'tab-cyan' },
    { id: 'analytics', icon: <Settings size={22} />, label: 'Analytics', color: 'tab-amber' },
  ];

  return (
    <div className="fixed left-0 top-20 bottom-0 w-72 p-8 hidden lg:block overflow-y-auto no-scrollbar">
      <div className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-5 p-4 rounded-2xl transition-all duration-400 ${activeTab === item.id
              ? 'sidebar-item-active font-bold translate-x-1'
              : 'sidebar-item'}`}
          >
            <span className={activeTab === item.id ? 'text-white' : ''}>{item.icon}</span>
            <span className="text-[13px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}
          className="flex items-center gap-5 p-4 rounded-2xl text-rose-400 hover:bg-rose-50 hover:text-rose-500 transition-all mt-6"
        >
          <X size={22} />
          <span className="text-[11px] font-black uppercase tracking-widest">Sign Out</span>
        </button>
      </div>

      <div className="mt-20 p-8 shine-card border-none bg-indigo-50/50">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Trending Globally</h3>
        <div className="flex flex-col gap-5">
          {[
            { tag: '#CultureBridge', color: 'text-indigo-500' },
            { tag: '#DigitalSafe', color: 'text-emerald-500' },
            { tag: '#GlobalConnect', color: 'text-rose-500' }
          ].map(item => (
            <a key={item.tag} href="#" className={`text-[12px] font-black ${item.color} transition-all flex items-center gap-3 hover:translate-x-1`}>
              <div className="w-1.5 h-1.5 rounded-full bg-current opacity-20"></div> {item.tag}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const Stories = () => {
  const stories = [
    { id: 1, name: 'Your Story', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix', me: true, color: 'from-violet-500 to-indigo-500' },
    { id: 2, name: 'Elena', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400', color: 'from-rose-500 to-rose-400' },
    { id: 3, name: 'Marco', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400', color: 'from-blue-500 to-cyan-500' },
    { id: 4, name: 'Anya', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400', color: 'from-emerald-500 to-teal-500' },
    { id: 5, name: 'Kenji', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', color: 'from-amber-500 to-orange-500' }
  ];

  return (
    <div className="flex gap-6 overflow-x-auto pb-10 no-scrollbar">
      {stories.map((s) => (
        <motion.div
          key={s.id}
          whileHover={{ y: -8, scale: 1.05 }}
          className="relative min-w-[140px] h-56 rounded-[36px] overflow-hidden cursor-pointer shadow-xl group"
        >
          <img src={s.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={s.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent"></div>
          <div className={`absolute top-4 left-4 w-12 h-12 rounded-2xl border-2 border-white overflow-hidden p-0.5 bg-gradient-to-tr ${s.color} shadow-2xl`}>
            <div className="w-full h-full rounded-[14px] overflow-hidden border-2 border-white/50 bg-white">
              <img src={s.img} className="w-full h-full object-cover" />
            </div>
          </div>
          <span className="absolute bottom-5 left-5 text-[11px] font-black text-white truncate w-[100px] uppercase tracking-wider">{s.name}</span>
          {s.me && (
            <div className="absolute top-12 left-12 w-6 h-6 bg-indigo-500 rounded-lg flex items-center justify-center border-2 border-white shadow-xl">
              <Plus size={14} className="text-white" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

const PostContent = ({ author, time, content, image, likes, comments }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    className="shine-card p-10 mb-10 group"
  >
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-5">
        <div className="p-0.5 rounded-2xl bg-gradient-to-br from-violet-500 via-indigo-500 to-rose-500 shadow-xl">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`} alt={author} className="w-14 h-14 rounded-[14px] bg-white ring-2 ring-white" />
        </div>
        <div>
          <h4 className="font-black text-[15px] text-slate-900 tracking-tight">{author}</h4>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{time}</p>
        </div>
      </div>
      <button className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-auto hover:bg-indigo-50 hover:text-indigo-500 transition-all">
        <Plus size={20} />
      </button>
    </div>

    <p className="text-[16px] text-slate-600 mb-8 leading-relaxed font-semibold italic">&quot;{content}&quot;</p>

    {image && (
      <div className="rounded-[32px] overflow-hidden mb-8 shadow-2xl ring-8 ring-slate-100/30">
        <img src={image} alt="Post media" className="w-full object-cover max-h-[600px] transition-transform duration-700 hover:scale-105" />
      </div>
    )}

    <div className="flex items-center gap-5 pt-8 mt-2 border-t border-slate-50">
      <button className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-rose-50/50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all font-black text-[11px] uppercase tracking-widest">
        <Heart size={20} className="group-hover:fill-white transition-all" />
        {likes}
      </button>
      <button className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-indigo-50/50 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all font-black text-[11px] uppercase tracking-widest">
        <MessageSquare size={20} className="group-hover:fill-white transition-all" />
        {comments}
      </button>
      <button className="ml-auto btn-shine-multi !py-3 !px-6 !rounded-2xl">
        Support Creator $5
      </button>
    </div>
  </motion.div>
);

const CreatePost = ({ addPost, user }) => {
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (!text && !imageFile) return;
    addPost({
      content: text,
      imageFile: imageFile
    });
    setText('');
    setImageFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="shine-card p-6 mb-10 border-none shadow-soft">
      <div className="flex gap-5 mb-6">
        <div className="p-0.5 rounded-2xl bg-gradient-to-br from-[#FFD700] to-amber-500 shadow-lg">
          <img src={user?.profilePic || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} alt="Profile" className="w-14 h-14 rounded-[14px] bg-white object-cover" />
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Spread the shiny vibes, ${user?.name?.split(' ')[0] || 'Member'}...`}
          className="flex-1 bg-slate-50/50 border-none focus:ring-0 resize-none py-4 px-5 rounded-2xl text-[15px] text-slate-800 placeholder-slate-400 font-medium"
          rows="2"
        ></textarea>
      </div>

      <AnimatePresence>
        {previewUrl && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative mb-6 group/image"
          >
            <img src={previewUrl} className="w-full h-80 object-cover rounded-[24px] shadow-soft ring-8 ring-slate-50" alt="Preview" />
            <button
              onClick={() => { setImageFile(null); setPreviewUrl(null); }}
              className="absolute top-4 right-4 bg-slate-900/40 backdrop-blur-md p-2 rounded-2xl text-white hover:bg-slate-900 transition-all opacity-0 group-hover/image:opacity-100 shadow-xl"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
        <div className="flex gap-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-2 text-slate-500 hover:text-emerald-500 transition-all font-bold"
          >
            <div className="p-2.5 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 transition-all">
              <PlusSquare size={22} className="text-emerald-500" />
            </div>
            <span className="text-xs uppercase tracking-widest">Image</span>
          </button>
          <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-all font-bold">
            <div className="p-2.5 rounded-2xl bg-blue-50 group-hover:bg-blue-100 transition-all">
              <Globe size={22} className="text-blue-500" />
            </div>
            <span className="text-xs uppercase tracking-widest">Global</span>
          </button>
        </div>
        <button
          onClick={handlePost}
          disabled={!text && !imageFile}
          className="btn-shine-multi !px-16 !py-4 shadow-indigo-100"
        >
          <span className="text-[12px]">Broadcast</span> <PlusSquare size={18} />
        </button>
      </div>
    </div>
  );
};


const Chat = ({ user }) => {
  const [messages, setMessages] = useState([
    { from: 'Marco', text: 'Hey ' + (user?.name || 'Felix') + '! Have you seen the new marketplace items?', time: '10:24 AM' },
    { from: 'You', text: 'Not yet! Checking them out now. The security on this app is insane.', time: '10:25 AM', self: true },
    { from: 'Marco', text: 'Yeah, the E2E encryption is legit. 🔒', time: '10:26 AM' }
  ]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://127.0.0.1:5000');
    const socket = socketRef.current;

    socket.emit('join_room', 'global_chat');

    socket.on('receive_message', (data) => {
      if (data.author !== (user?.name || 'Felix')) {
        setMessages(prev => [...prev, {
          from: data.author,
          text: data.message,
          time: data.time
        }]);
      }
    });

    return () => socket.close();
  }, [user]);

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || !socketRef.current) return;

    const messageData = {
      room: 'global_chat',
      message: input,
      author: user?.name || 'Felix',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    socketRef.current.emit('send_message', messageData);
    setMessages(prev => [...prev, { ...messageData, from: 'You', self: true }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[650px] shine-card overflow-hidden border-none shadow-3xl bg-white/70 backdrop-blur-3xl ring-12 ring-slate-100/30">
      <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white/50">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-[20px] bg-indigo-50 flex items-center justify-center text-indigo-500 shadow-xl shadow-indigo-500/10">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h3 className="text-[14px] font-black text-slate-900 uppercase tracking-tight">Secure Nexus Stream</h3>
            <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.2em] flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></span> E2E Encryption Active
            </p>
          </div>
        </div>
        <button className="p-3 rounded-2xl hover:bg-slate-50 text-slate-400 transition-all">
          <Settings size={22} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar bg-gradient-to-b from-transparent to-indigo-50/10">
        <div className="flex justify-center mb-4">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] bg-white/80 backdrop-blur-md text-slate-400 px-6 py-2 rounded-full border border-slate-100 shadow-sm">Global Exchange Protocol</span>
        </div>

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] p-6 rounded-[28px] text-[14px] font-medium shadow-xl border border-white/50 ${msg.self
              ? 'bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] text-white rounded-br-none shadow-indigo-500/20'
              : 'bg-white text-slate-600 rounded-bl-none shadow-sm'}`}>
              {!msg.self && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.from}`} className="w-4 h-4" />
                  </div>
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{msg.from}</p>
                </div>
              )}
              <p className="leading-relaxed italic">{msg.text}</p>
              <div className={`flex items-center gap-2 mt-3 opacity-40 ${msg.self ? 'justify-end' : 'justify-start'}`}>
                <p className="text-[9px] font-black uppercase tracking-widest">{msg.time}</p>
                {msg.self && <ShieldCheck size={10} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="p-8 bg-white border-t border-slate-50">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Transmit secure signal..."
            className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-5 px-8 pr-16 focus:outline-none focus:ring-8 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-500/20 transition-all text-[14px] font-black placeholder:text-slate-300"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900 p-3 rounded-2xl text-white shadow-2xl hover:scale-105 active:scale-95 transition-all">
            <MessageSquare size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

const Groups = () => (
  <div className="space-y-10">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">Communities</h2>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Global Interest Hubs</p>
      </div>
      <button className="btn-shine-multi !p-4 !rounded-2xl shadow-xl shadow-indigo-500/10">
        <Plus size={18} /> <span className="text-[10px]">Create Circle</span>
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[
        { name: 'Gourmet World', members: '12.4k', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600', color: 'from-orange-500 to-rose-500' },
        { name: 'Travel Pioneers', members: '8.2k', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600', color: 'from-blue-500 to-indigo-500' },
        { name: 'EcoConnect', members: '5.1k', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600', color: 'from-emerald-500 to-teal-500' },
        { name: 'Tech Global', members: '15.9k', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600', color: 'from-indigo-500 to-violet-600' }
      ].map((group, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -8 }}
          className="shine-card overflow-hidden relative group cursor-pointer border-none"
        >
          <div className="h-40 w-full overflow-hidden">
            <img src={group.img} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
            <div className={`absolute inset-0 bg-gradient-to-br ${group.color} mix-blend-multiply opacity-40 group-hover:opacity-20 transition-opacity`}></div>
          </div>
          <div className="p-6 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent">
            <h4 className="font-black text-xl text-white tracking-tight">{group.name}</h4>
            <p className="text-[10px] font-black text-white/70 uppercase tracking-widest">{group.members} Elite members</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const Profile = () => (
  <div className="space-y-10">
    <div className="shine-card p-12 text-center relative overflow-hidden border-none shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-violet-500 via-indigo-500 to-rose-500 opacity-20"></div>
      <div className="relative z-10 mt-6">
        <div className="relative inline-block mb-6">
          <div className="p-1 rounded-full bg-gradient-to-tr from-violet-500 via-indigo-500 to-rose-500 shadow-2xl">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-32 h-32 rounded-full border-4 border-white mx-auto object-cover" alt="Avatar" />
          </div>
          <div className="absolute bottom-2 right-2 bg-emerald-500 p-2 rounded-2xl border-4 border-white shadow-xl">
            <ShieldCheck size={20} className="text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Felix Gipjazes</h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-[10px] font-black text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 uppercase tracking-[0.2em]">Elite Pioneer</span>
        </div>
        <p className="text-slate-500 font-medium text-[15px] max-w-sm mx-auto my-8 leading-relaxed">Building the future of global connection, one spectrum at a time. Tech enthusiast & world traveler. 🌌🚀</p>
        <div className="flex justify-center gap-12 pt-8 border-t border-slate-100">
          <div><p className="font-black text-xl text-slate-900">128</p><p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Logs</p></div>
          <div><p className="font-black text-xl text-slate-900">4.2k</p><p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Network</p></div>
          <div><p className="font-black text-xl text-slate-900">856</p><p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Insights</p></div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="shine-card p-8 bg-white/50 border-none shadow-xl">
        <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
            <Settings size={18} />
          </div>
          Control Center
        </h3>
        <div className="space-y-3">
          {['Identity Manifest', 'Cryptographic Privacy', 'Interstellar Nodes', 'Frequency Tones'].map(item => (
            <button key={item} className="w-full text-left text-[13px] font-bold text-slate-500 hover:text-indigo-500 p-4 hover:bg-indigo-50/50 rounded-2xl transition-all border-b border-slate-50 last:border-0">
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="shine-card p-8 bg-gradient-to-br from-slate-900 to-indigo-950 border-none shadow-2xl">
        <h3 className="text-[13px] font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#FFD700]">
            <PlusSquare size={18} />
          </div>
          Elite Tiers
        </h3>
        <ul className="text-[12px] text-white/60 space-y-4">
          <li className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl border border-white/5 font-bold"><div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_#4ade80]"></div> Multi-Node Stream Access</li>
          <li className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl border border-white/5 font-bold"><div className="w-2 h-2 bg-rose-400 rounded-full shadow-[0_0_8px_#fb7185]"></div> Infinite Storage Matrix</li>
          <li className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl border border-white/5 font-bold"><div className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_8px_#60a5fa]"></div> Priority Global Traffic</li>
        </ul>
        <button className="w-full mt-8 btn-shine-multi !p-4 !rounded-2xl">Elevate Status</button>
      </div>
    </div>
  </div>
);

const Analytics = () => (
  <div className="space-y-10 pb-20">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: 'Network Reach', value: '$24,850', color: 'text-violet-500', bg: 'bg-violet-50' },
        { label: 'Active Streams', value: '102.4k', color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { label: 'Growth Ratio', value: '8.4%', color: 'text-rose-500', bg: 'bg-rose-50' }
      ].map((stat, i) => (
        <div key={i} className="shine-card p-8 border-none shadow-xl">
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-3">{stat.label}</p>
          <div className="flex items-end justify-between">
            <p className={`text-2xl font-black ${stat.color} tracking-tight`}>{stat.value}</p>
            <div className={`w-8 h-8 ${stat.bg} rounded-xl flex items-center justify-center`}>
              <div className={`w-1.5 h-1.5 rounded-full ${stat.color.replace('text', 'bg')} animate-pulse`}></div>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="shine-card p-10 border-none shadow-2xl bg-white/70 backdrop-blur-3xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Spectrum Map</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Cross-Continental Growth</p>
        </div>
        <select className="bg-slate-50 text-[10px] font-black uppercase tracking-widest border border-slate-100 px-4 py-2 rounded-xl outline-none text-slate-600 cursor-pointer hover:bg-white transition-all">
          <option>Flux: 30D</option>
          <option>Flux: 6M</option>
        </select>
      </div>
      <div className="h-56 w-full bg-slate-50/50 rounded-[32px] relative flex items-end justify-between p-8 px-12 overflow-hidden border border-white">
        {/* Mock Chart */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent"></div>
        {[40, 60, 45, 90, 65, 80, 55, 100, 85].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.1, duration: 1, ease: "easeOut" }}
            className={`w-6 rounded-t-xl bg-gradient-to-t ${i % 4 === 0 ? 'from-violet-500 to-indigo-400' :
              i % 4 === 1 ? 'from-indigo-500 to-blue-400' :
                i % 4 === 2 ? 'from-emerald-500 to-teal-400' :
                  'from-rose-500 to-pink-400'
              } shadow-lg`}
          ></motion.div>
        ))}
      </div>
    </div>

    <div className="shine-card overflow-hidden border-none shadow-xl">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase font-black tracking-widest">
          <tr>
            <th className="p-6">Interstellar Node</th>
            <th className="p-6">Frequency</th>
            <th className="p-6">Signal Strength</th>
          </tr>
        </thead>
        <tbody className="bg-white/50">
          {[
            { region: 'Northern Spectrum', rev: 'Link Active', grow: '+15.2%', color: 'text-violet-500' },
            { region: 'European Matrix', rev: 'Link High', grow: '+9.4%', color: 'text-blue-500' },
            { region: 'Asian Gateway', rev: 'Link Elite', grow: '+22.1%', color: 'text-emerald-500' }
          ].map((row, i) => (
            <tr key={i} className="border-t border-slate-50 hover:bg-indigo-50/30 transition-all group">
              <td className="p-6 font-black text-slate-900">{row.region}</td>
              <td className="p-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">{row.rev}</td>
              <td className={`p-6 ${row.color} font-black tracking-tighter text-lg`}>{row.grow}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Marketplace = ({ products, onPurchase }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-32">
    {products.map((item, i) => (
      <motion.div
        key={item._id}
        whileHover={{ y: -12 }}
        className="shine-card overflow-hidden group border-none shadow-xl hover:shadow-2xl transition-all duration-500"
      >
        <div className="h-64 overflow-hidden relative">
          <img src={item.image || item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#8B5CF6] shadow-2xl border border-indigo-50">
            {item.stock > 0 ? 'Verified Node' : 'Depleted'}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-black text-xl text-slate-900 tracking-tight leading-tight">{item.name}</h4>
            <span className={`text-2xl font-black ${i % 2 === 0 ? 'text-[#8B5CF6]' : 'text-rose-500'} tracking-tighter`}>{item.price}</span>
          </div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-5 h-5 rounded-lg bg-slate-50 flex items-center justify-center">
              <Globe size={12} className="text-slate-400" />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gateway: {item.origin}</p>
          </div>
          <button
            onClick={() => onPurchase(item)}
            disabled={item.stock === 0}
            className="w-full btn-shine-multi !py-4 shadow-indigo-200 disabled:opacity-30"
          >
            {item.stock > 0 ? 'Acquire Resource' : 'Out of Sync'}
          </button>
        </div>
      </motion.div>
    ))}
  </div>
);


const MerchantCenter = ({ products, orders }) => {
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const totalSales = orders.reduce((acc, curr) => acc + parseFloat(curr.totalPrice.replace('$', '') || 0), 0);

  return (
    <div className="space-y-12 pb-20">
      <div className="shine-card p-12 bg-gradient-to-br from-indigo-50/50 via-white to-rose-50/20 border-none shadow-2xl">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Architecture <span className="gradient-text-multi italic">Hub</span></h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-2">Personal Inventory Node</p>
          </div>
          <button className="btn-shine-multi shadow-indigo-500/10 !px-10">
            <Plus size={20} /> <span className="text-[12px]">Manifest New</span>
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Awaiting Sync', value: pendingOrders, color: 'text-rose-500', bg: 'bg-rose-50' },
            { label: 'Total Flux', value: `$${totalSales.toLocaleString()}`, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'Active Process', value: orders.filter(o => o.status === 'Processing').length, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Nexus Score', value: '4.9/5', color: 'text-[#8B5CF6]', bg: 'bg-indigo-50' }
          ].map((s, i) => (
            <div key={i} className={`${s.bg} p-8 rounded-[32px] border border-white shadow-soft transition-all hover:scale-105`}>
              <p className="text-[9px] text-slate-400 uppercase font-black tracking-[0.2em] mb-3">{s.label}</p>
              <p className={`text-3xl font-black ${s.color} tracking-tighter`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="shine-card overflow-hidden border-none shadow-xl">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Current Artifacts</h3>
            <button className="text-[10px] text-indigo-500 font-black uppercase tracking-widest hover:underline">Reconfigure All</button>
          </div>
          <div className="p-8 space-y-5">
            {products.map((item) => (
              <div key={item._id} className="flex items-center justify-between p-5 bg-white rounded-3xl shadow-sm border border-slate-50 hover:border-indigo-200 transition-all group">
                <div className="flex items-center gap-5">
                  <div className="p-0.5 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 shadow-lg group-hover:scale-110 transition-transform">
                    <img src={item.image || item.img} className="w-14 h-14 rounded-2xl bg-white object-cover" />
                  </div>
                  <div>
                    <p className="text-[14px] font-black text-slate-900 leading-tight">{item.name}</p>
                    <p className="text-[11px] font-black text-indigo-400 mt-1 uppercase tracking-widest">{item.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${item.stock === 0 ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                    {item.stock} Stocked
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="shine-card overflow-hidden border-none shadow-xl">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Recent Stream</h3>
            <button className="text-[10px] text-rose-500 font-black uppercase tracking-widest hover:underline">Full Analytics</button>
          </div>
          <div className="p-8 space-y-5">
            {orders.length === 0 ? (
              <div className="text-center py-20 opacity-30">
                <Globe size={64} className="mx-auto mb-6 text-slate-200 animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Awaiting Signal</p>
              </div>
            ) : (
              orders.slice(0, 5).map((order) => (
                <div key={order._id} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-3xl border border-white hover:bg-white transition-all">
                  <div>
                    <p className="text-[12px] font-black text-slate-900 leading-none mb-1 uppercase tracking-tight">Signal #{order._id.slice(-6)}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{order.product?.name || 'Protocol Node'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px] font-black text-indigo-500 mb-1 leading-none">{order.totalPrice}</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Verified</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PurchaseModal = ({ product, onClose, onConfirm }) => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!address) return;
    setLoading(true);
    await onConfirm(product, address);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="shine-card p-12 max-w-[480px] w-full border-none shadow-3xl ring-12 ring-white/20 bg-white"
      >
        <h3 className="text-3xl font-black mb-2 tracking-tighter text-slate-900 uppercase">Synchronize Acquisition</h3>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10">Confirming Neural Exchange</p>

        <div className="flex justify-between items-center mb-10 p-8 bg-slate-50 rounded-[32px] border border-white shadow-inner">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Resource ID</p>
            <p className="text-sm font-black text-slate-900 tracking-tight">{product.name}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Protocol Fee</p>
            <p className="text-3xl font-black text-indigo-500 tracking-tighter leading-none">{product.price}</p>
          </div>
        </div>

        <div className="space-y-4 mb-12">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
            <Globe size={14} className="text-indigo-400" /> Signal Destination
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Specify point of origin/entry..."
            className="w-full bg-slate-50 border border-slate-100 rounded-[28px] py-5 px-6 focus:outline-none focus:ring-8 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-500/20 transition-all text-sm font-black placeholder:text-slate-300 h-36 resize-none"
          />
        </div>

        <div className="flex gap-6">
          <button onClick={onClose} className="flex-1 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-rose-500 transition-colors">Abort Stream</button>
          <button
            onClick={handleConfirm}
            disabled={!address || loading}
            className="flex-2 btn-shine-multi !px-12 !py-5 disabled:opacity-30"
          >
            {loading ? 'Transmitting...' : <><ShieldCheck size={18} /> <span className="text-[12px]">Authorize Transfer</span></>}
          </button>
        </div>
      </motion.div>
    </div>
  );
};


const RightPanel = () => (
  <div className="fixed right-0 top-20 bottom-0 w-96 p-12 hidden xl:block overflow-y-auto no-scrollbar">
    <div className="shine-card p-8 mb-10 border-none bg-gradient-to-br from-indigo-50/30 to-white shadow-xl">
      <h3 className="text-[11px] font-black mb-8 flex items-center gap-3 text-indigo-500 uppercase tracking-[0.2em]">
        <Users size={20} /> Pulse Network
      </h3>
      <div className="flex flex-col gap-8">
        {[
          { name: 'Elena Rodriguez', meta: 'Artist • Madrid', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', color: 'bg-rose-500' },
          { name: 'Kenji Sato', meta: 'Dev • Tokyo', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kenji', color: 'bg-indigo-500' }
        ].map((person, i) => (
          <div key={i} className="flex items-center justify-between group cursor-pointer hover:translate-x-1 transition-all">
            <div className="flex items-center gap-4">
              <div className={`p-0.5 rounded-2xl bg-gradient-to-tr ${i === 0 ? 'from-rose-400 to-indigo-400' : 'from-indigo-400 to-emerald-400'} shadow-lg`}>
                <img src={person.img} className="w-12 h-12 rounded-[14px] bg-white border-2 border-white" />
              </div>
              <div>
                <h4 className="text-[13px] font-black text-slate-900 leading-tight">{person.name}</h4>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{person.meta}</p>
              </div>
            </div>
            <button className={`w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-all`}>
              <Plus size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="shine-card p-10 border-none bg-gradient-to-br from-slate-900 to-indigo-950 shadow-2xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-indigo-400">
          <ShoppingBag size={22} />
        </div>
        <h3 className="text-[13px] font-black uppercase tracking-[0.2em] text-white">Neural Hub</h3>
      </div>
      <p className="text-[13px] text-white/50 font-medium mb-8 leading-relaxed italic">&quot;Transmit resources and forge alliances across the spectrum.&quot;</p>
      <button className="w-full btn-shine-multi !py-4 shadow-indigo-900">
        Initiate Browse
      </button>
    </div>

    <div className="shine-card p-10 mt-10 border-none bg-indigo-50/20">
      <h3 className="text-[10px] font-black mb-6 flex items-center gap-3 text-slate-400 uppercase tracking-[0.3em]">
        Signal Strength
      </h3>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Global Impact</p>
          <p className="text-4xl font-black text-slate-900 tracking-tighter">$8.4M</p>
        </div>
        <div className="text-[12px] text-emerald-500 font-black px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">+14.2%</div>
      </div>
    </div>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [feedPosts, setFeedPosts] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications(prev => [{ id, type, message }, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/posts');
      const data = await response.json();
      if (response.ok) {
        setFeedPosts(data);
      }
    } catch (_err) {
      console.error('Failed to fetch posts:', _err);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/products');
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      }
    } catch (_err) {
      console.error('Failed to fetch products:', _err);
    }
  };

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://127.0.0.1:5000/api/products/orders', {
        headers: { 'x-auth-token': token }
      });
      const data = await response.json();
      if (response.ok) {
        setOrders(data);
      }
    } catch (_err) {
      console.error('Failed to fetch orders:', _err);
    }
  };

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('token');
    if (token && !user) {
      setTimeout(() => {
        setUser({ id: 'u1', name: 'Demo User', isPro: true });
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        fetchPosts();
        fetchProducts();
        fetchOrders();
      }, 0);
    }
  }, [user]);




  const handlePurchase = async (product, address) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/products/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
          totalPrice: product.price,
          shippingAddress: address
        })
      });

      if (response.ok) {
        addNotification('success', `Ordered ${product.name}! Support ticket created. 📦`);
        fetchProducts(); // Refresh stock
        fetchOrders();   // Refresh orders
      }

    } catch (_err) {
      addNotification('error', 'Purchase failed. Please try again.');
    }
  };

  const addPost = async (postData) => {
    const token = localStorage.getItem('token');
    let imageUrl = '';
    const baseUrl = 'http://127.0.0.1:5000';

    try {
      if (postData.imageFile) {
        const formData = new FormData();
        formData.append('image', postData.imageFile);
        const uploadRes = await fetch(`${baseUrl}/api/posts/upload`, {
          method: 'POST',
          headers: { 'x-auth-token': token },
          body: formData
        });
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }

      const response = await fetch(`${baseUrl}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          content: postData.content,
          media: imageUrl,
          mediaType: imageUrl ? 'image' : 'text',
          location: 'Global'
        })
      });

      const newPostData = await response.json();
      if (response.ok) {
        setFeedPosts([newPostData, ...feedPosts]);
        addNotification('success', 'Post published globally! 🌍');
      }
    } catch (_err) {
      console.error('Add Post Error:', _err);
      addNotification('error', 'Failed to publish post. Check connection.');
    }
  };

  // Auto-trigger mock notifications for demo
  useEffect(() => {
    if (user) {
      const timers = [
        setTimeout(() => addNotification('success', 'Incoming Tip: You received $5 from Elena! 💰'), 8000),
        setTimeout(() => addNotification('info', 'Trending: #Carnival2026 is blowing up in Brazil 🇧🇷'), 15000),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [user]);


  if (!user) {
    return <Auth onLogin={(userData) => setUser(userData)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100">
      <Navbar setActiveTab={setActiveTab} />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pt-28 px-10 lg:ml-72 xl:mr-96 max-w-2xl mx-auto min-h-screen pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {activeTab === 'feed' ? (
              <>
                <Stories />
                <CreatePost addPost={addPost} user={user} />
                <div className="flex flex-col gap-0">
                  {feedPosts.length === 0 ? (
                    <div className="py-32 text-center opacity-40">
                      <div className="w-16 h-16 border-4 border-slate-200 border-t-[#8B5CF6] rounded-full animate-spin mx-auto mb-6 shadow-xl"></div>
                      <p className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-500">Syncing Spectrum...</p>
                    </div>
                  ) : (
                    feedPosts.map((post) => (
                      <PostContent
                        key={post._id}
                        author={post.userId?.name || (typeof post.userId === 'string' ? 'User' : 'Felix')}
                        time={new Date(post.createdAt).toLocaleDateString() + ' • ' + (post.location || 'Global')}
                        content={post.content}
                        image={post.media}
                        likes={post.likes?.length || 0}
                        comments={post.comments?.length || 0}
                      />
                    ))
                  )}
                </div>
              </>
            ) : activeTab === 'marketplace' ? (
              <div className="pb-24">
                <div className="flex flex-col mb-12">
                  <h2 className="text-5xl font-black tracking-tighter text-slate-900 mb-4">World <span className="gradient-text-gold italic">Market</span></h2>
                  <p className="text-slate-500 font-medium text-sm">Discover and support artisans from all seven continents.</p>
                </div>
                <Marketplace products={products} onPurchase={(p) => setSelectedProduct(p)} />
              </div>
            ) : activeTab === 'merchants' ? (
              <MerchantCenter products={products} orders={orders} />
            ) : activeTab === 'chat' ? (
              <Chat user={user} />
            ) : activeTab === 'groups' ? (
              <Groups />
            ) : activeTab === 'profile' ? (
              <Profile />
            ) : activeTab === 'analytics' ? (
              <Analytics />
            ) : (
              <div className="flex flex-col items-center justify-center py-32 opacity-30">
                <Globe size={64} className="mb-6 text-[#FFD700] animate-pulse" />
                <p className="text-sm font-black tracking-widest uppercase text-slate-400">Expanding Horizon...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      <RightPanel />

      <AnimatePresence>
        {selectedProduct && (
          <PurchaseModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onConfirm={handlePurchase}
          />
        )}
      </AnimatePresence>

      {/* System Status Indicator */}

      <div className="fixed bottom-3 left-10 z-50 flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Neural Link Stable // v1.2.0-SHINE</span>
      </div>

      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="p-5 rounded-[24px] shadow-2xl bg-white/90 backdrop-blur-xl border border-white ring-8 ring-slate-100/50 pointer-events-auto min-w-[320px]"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl ${n.type === 'success' ? 'bg-emerald-50 text-emerald-500' : 'bg-blue-50 text-blue-500'}`}>
                  {n.type === 'success' ? <Heart size={20} /> : <Globe size={20} />}
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    {n.type === 'success' ? 'Acquisition' : 'Global Insight'}
                  </p>
                  <p className="text-[13px] text-slate-900 font-bold leading-snug">{n.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
