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
      <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#FFB800] rounded-2xl flex items-center justify-center shadow-xl shadow-yellow-500/30 rotate-3">
        <Globe className="text-slate-900" size={28} />
      </div>
      <h1 className="text-2xl font-black tracking-tight hidden md:block text-slate-900">
        Gipjazes<span className="gradient-text-gold"> Connect</span>
      </h1>
    </div>

    <div className="flex-1 max-w-lg mx-12 hidden md:block">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search the global network..."
          className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 transition-all font-medium placeholder-slate-400"
        />
      </div>
    </div>

    <div className="flex items-center gap-6">
      <button className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all relative group">
        <Bell size={22} className="text-slate-600 group-hover:text-amber-500" />
        <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
      <button className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all group">
        <MessageCircle size={22} className="text-slate-600 group-hover:text-blue-500" />
      </button>
      <div className="relative group cursor-pointer hover:scale-105 transition-transform" onClick={() => setActiveTab('profile')}>
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-11 h-11 rounded-2xl border-2 border-[#FFD700] shadow-lg shadow-yellow-500/20" />
        <span className="absolute -bottom-1 -right-1 bg-slate-900 text-white text-[8px] font-black px-2 py-0.5 rounded-lg border-2 border-white">PRO</span>
      </div>
    </div>
  </nav>
);

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'feed', icon: <Home size={22} />, label: 'Feed' },
    { id: 'groups', icon: <Users size={22} />, label: 'Groups' },
    { id: 'events', icon: <Calendar size={22} />, label: 'Events' },
    { id: 'marketplace', icon: <ShoppingBag size={22} />, label: 'Marketplace' },
    { id: 'merchants', icon: <Calendar size={22} />, label: 'Merchant Hub' },
    { id: 'chat', icon: <ShieldCheck size={22} />, label: 'Global Chat' },
    { id: 'analytics', icon: <Settings size={22} />, label: 'Analytics' },
  ];

  return (
    <div className="fixed left-0 top-20 bottom-0 w-72 p-8 hidden lg:block overflow-y-auto no-scrollbar">
      <div className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-5 p-4 rounded-2xl transition-all duration-300 ${activeTab === item.id ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-slate-900 shadow-xl shadow-yellow-500/20 font-bold translate-x-1' : 'text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-soft'}`}
          >
            <span className={activeTab === item.id ? 'text-slate-900' : 'text-slate-400'}>{item.icon}</span>
            <span className="text-sm tracking-wide">{item.label}</span>
          </button>
        ))}
        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}
          className="flex items-center gap-5 p-4 rounded-2xl text-red-400 hover:bg-red-50 hover:text-red-500 transition-all mt-6"
        >
          <X size={22} />
          <span className="text-sm font-bold">Sign Out</span>
        </button>
      </div>

      <div className="mt-16 p-6 glass-morphism border-none bg-blue-50/50">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Trending Globally</h3>
        <div className="flex flex-col gap-4">
          {['#LunarNewYear', '#Carnival2026', '#GlobalBridge'].map(tag => (
            <a key={tag} href="#" className="text-xs font-bold text-slate-600 hover:text-blue-500 transition-colors flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-400"></div> {tag}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const Stories = () => {
  const stories = [
    { id: 1, name: 'Your Story', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix', me: true },
    { id: 2, name: 'Elena', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400' },
    { id: 3, name: 'Marco', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400' },
    { id: 4, name: 'Anya', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400' },
    { id: 5, name: 'Kenji', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' }
  ];

  return (
    <div className="flex gap-4 overflow-x-auto pb-8 no-scrollbar">
      {stories.map((s) => (
        <motion.div
          key={s.id}
          whileHover={{ y: -5, scale: 1.02 }}
          className="relative min-w-[120px] h-48 rounded-[32px] overflow-hidden cursor-pointer shadow-soft border-4 border-white"
        >
          <img src={s.img} className="w-full h-full object-cover" alt={s.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          <div className="absolute top-3 left-3 w-10 h-10 rounded-2xl border-2 border-white overflow-hidden shadow-lg">
            <img src={s.img} className="w-full h-full object-cover" />
          </div>
          <span className="absolute bottom-4 left-4 text-xs font-black text-white truncate w-[90px] uppercase tracking-tighter">{s.name}</span>
          {s.me && (
            <div className="absolute top-10 left-10 w-6 h-6 bg-[#FFD700] rounded-lg flex items-center justify-center border-2 border-white shadow-xl">
              <Plus size={14} className="text-slate-900" />
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
    className="shine-card p-6 mb-8 hover-lift"
  >
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="p-0.5 rounded-2xl bg-gradient-to-br from-[#FFD700] to-orange-400">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`} alt={author} className="w-12 h-12 rounded-[14px] bg-white" />
        </div>
        <div>
          <h4 className="font-extrabold text-sm text-slate-900">{author}</h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{time}</p>
        </div>
      </div>
      <button className="text-slate-300 hover:text-amber-500 transition-colors"><PlusSquare size={22} /></button>
    </div>

    <p className="text-[15px] text-slate-700 mb-6 leading-relaxed font-medium">{content}</p>

    {image && (
      <div className="rounded-[24px] overflow-hidden mb-6 shadow-2xl ring-4 ring-slate-50">
        <img src={image} alt="Post media" className="w-full object-cover max-h-[500px]" />
      </div>
    )}

    <div className="flex items-center gap-4 pt-6 mt-2 border-t border-slate-100">
      <button className="group flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition-all font-bold text-xs ring-1 ring-inset ring-slate-200 hover:ring-rose-200">
        <Heart size={18} className="group-hover:fill-rose-500 transition-all" />
        {likes}
      </button>
      <button className="group flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-500 transition-all font-bold text-xs ring-1 ring-inset ring-slate-200 hover:ring-blue-200">
        <MessageSquare size={18} />
        {comments}
      </button>
      <button className="ml-auto bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-600 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ring-1 ring-emerald-200/50 hover:scale-105 active:scale-95 transition-all">
        Support Creator $5
      </button>
      <button className="text-slate-300 hover:text-slate-600 transition-colors">
        <Share2 size={20} />
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
          className="btn-shine px-12"
        >
          Publish <PlusSquare size={18} />
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
    <div className="flex flex-col h-[600px] shine-card overflow-hidden border-none shadow-2xl bg-white/70 backdrop-blur-3xl ring-8 ring-slate-100/30">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-sm">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-tight">Cloud Secure Chat</h3>
            <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></span> Encrypted Stream Active
            </p>
          </div>
        </div>
        <button className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors">
          <Settings size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-gradient-to-b from-transparent to-slate-50/20">
        <div className="flex justify-center">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-white text-slate-400 px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">Global Exchange</span>
        </div>

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl text-[13px] font-medium shadow-soft border border-white ${msg.self
              ? 'bg-gradient-to-br from-[#FFD700] to-[#FFB800] text-slate-900 rounded-br-none'
              : 'bg-white text-slate-600 rounded-bl-none'}`}>
              {!msg.self && <p className="text-[10px] font-black mb-1.5 text-indigo-500 uppercase tracking-widest">{msg.from}</p>}
              <p className="leading-relaxed">{msg.text}</p>
              <p className={`text-[9px] mt-2 font-bold uppercase tracking-tighter opacity-60`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="p-6 bg-white/50 border-t border-slate-50">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Transmit secure message..."
            className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-4 px-6 pr-14 focus:outline-none focus:ring-4 focus:ring-[#FFD700]/10 focus:bg-white focus:border-[#FFD700]/50 transition-all text-[13px] font-semibold"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900 p-2.5 rounded-2xl text-white shadow-xl hover:scale-110 active:scale-95 transition-all">
            <MessageSquare size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

const Groups = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">Cultural Communities</h2>
      <button className="btn-primary py-2 px-4 text-xs">+ Create Group</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { name: 'Gourmet World', members: '12.4k', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600', color: 'bg-orange-500' },
        { name: 'Travel Pioneers', members: '8.2k', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600', color: 'bg-blue-500' },
        { name: 'EcoConnect', members: '5.1k', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600', color: 'bg-green-500' },
        { name: 'Tech Global', members: '15.9k', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600', color: 'bg-purple-500' }
      ].map((group, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.02 }}
          className="glass-morphism overflow-hidden relative group cursor-pointer"
        >
          <div className="h-32 w-full overflow-hidden">
            <img src={group.img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="p-4 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent">
            <h4 className="font-bold text-lg">{group.name}</h4>
            <p className="text-xs text-slate-300">{group.members} members</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const Profile = () => (
  <div className="space-y-8">
    <div className="glass-morphism p-8 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-[#2F4F7F] to-[#FF9900] opacity-30"></div>
      <div className="relative z-10">
        <div className="relative inline-block mb-4">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-24 h-24 rounded-full border-4 border-slate-900 mx-auto" alt="Avatar" />
          <div className="absolute bottom-0 right-0 bg-[#3CB371] p-1.5 rounded-full border-2 border-slate-900">
            <PlusSquare size={14} className="text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">Felix Gipjazes</h2>
        <p className="text-[#FF9900] font-bold text-sm mb-4">PRO MEMBER</p>
        <p className="text-sm text-slate-400 max-w-sm mx-auto mb-6">Building the future of global connection, one pixel at a time. Tech enthusiast & world traveler. 🌍✨</p>
        <div className="flex justify-center gap-8 border-t border-slate-700/50 pt-6">
          <div><p className="font-bold">128</p><p className="text-[10px] text-slate-500 uppercase">Posts</p></div>
          <div><p className="font-bold">4.2k</p><p className="text-[10px] text-slate-500 uppercase">Followers</p></div>
          <div><p className="font-bold">856</p><p className="text-[10px] text-slate-500 uppercase">Following</p></div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-morphism p-5">
        <h3 className="text-sm font-bold mb-4 flex items-center gap-2"><Settings size={18} /> Account Settings</h3>
        <div className="space-y-4">
          {['Edit Profile', 'Privacy & Security', 'Language: English', 'Notifications'].map(item => (
            <button key={item} className="w-full text-left text-sm text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-lg transition-colors border-b border-slate-700/30">
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="glass-morphism p-5">
        <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-[#FF9900]">✨ Premium Benefits</h3>
        <ul className="text-xs text-slate-400 space-y-3">
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#FF9900] rounded-full"></div> Verified GOLD badge</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#FF9900] rounded-full"></div> 10% more commission on tips</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#FF9900] rounded-full"></div> Early access to Gipjazes Labs</li>
        </ul>
        <button className="w-full mt-6 bg-slate-800 text-white py-2 rounded-lg text-xs font-bold hover:bg-[#FF9900] transition-colors">Manage Subscription</button>
      </div>
    </div>
  </div>
);

const Analytics = () => (
  <div className="space-y-8 pb-10">
    <div className="grid grid-cols-3 gap-4">
      {[
        { label: 'Total Earnings', value: '$24,850', color: 'text-[#FF9900]' },
        { label: 'Active Sessions', value: '102.4k', color: 'text-[#3CB371]' },
        { label: 'Conversion', value: '8.4%', color: 'text-blue-400' }
      ].map((stat, i) => (
        <div key={i} className="glass-morphism p-4">
          <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">{stat.label}</p>
          <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>

    <div className="glass-morphism p-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold">Growth Map 🌐</h3>
        <select className="bg-slate-800 text-xs border border-slate-700 px-3 py-1 rounded-md outline-none">
          <option>Last 30 Days</option>
          <option>Last 6 Months</option>
        </select>
      </div>
      <div className="h-48 w-full bg-slate-800/20 rounded-xl relative flex items-end justify-between p-4 px-8 overflow-hidden">
        {/* Mock Chart */}
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent"></div>
        {[40, 60, 45, 90, 65, 80, 55, 100, 85].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.1 }}
            className="w-4 bg-gradient-to-t from-[#FF9900] to-orange-400 rounded-t-sm"
          ></motion.div>
        ))}
      </div>
    </div>

    <div className="glass-morphism overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-800/80 text-[10px] text-slate-500 uppercase font-bold">
          <tr>
            <th className="p-4">Region</th>
            <th className="p-4">Revenue</th>
            <th className="p-4">Growth</th>
          </tr>
        </thead>
        <tbody>
          {[
            { region: 'North America', rev: '$12,400', grow: '+15.2%' },
            { region: 'Europe', rev: '$8,200', grow: '+9.4%' },
            { region: 'Asia Pacific', rev: '$4,250', grow: '+22.1%' }
          ].map((row, i) => (
            <tr key={i} className="border-t border-slate-700/30 hover:bg-slate-800/30 transition-colors">
              <td className="p-4 font-medium">{row.region}</td>
              <td className="p-4 text-slate-300">{row.rev}</td>
              <td className="p-4 text-[#3CB371] font-bold">{row.grow}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Marketplace = ({ products, onPurchase }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-32">
    {products.map((item) => (
      <motion.div
        key={item._id}
        whileHover={{ y: -10 }}
        className="shine-card overflow-hidden group border-none shadow-soft hover:shadow-2xl transition-all duration-500"
      >
        <div className="h-56 overflow-hidden relative">
          <img src={item.image || item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-emerald-600 shadow-xl border border-emerald-50">
            {item.stock > 0 ? 'Verified Item' : 'Out of Stock'}
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-black text-lg text-slate-900 tracking-tight">{item.name}</h4>
            <span className="text-xl font-black text-[#FFB800]">{item.price}</span>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <Globe size={14} className="text-slate-400" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Link: {item.origin}</p>
          </div>
          <button
            onClick={() => onPurchase(item)}
            disabled={item.stock === 0}
            className="w-full btn-shine py-4 text-xs justify-center disabled:opacity-30"
          >
            {item.stock > 0 ? 'Place Order' : 'Sold Out'}
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
    <div className="space-y-10">
      <div className="shine-card p-10 bg-gradient-to-r from-blue-50/50 to-white">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-black tracking-tighter text-slate-900">Merchant <span className="gradient-text-gold italic">Hub</span></h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Global Inventory Architecture</p>
          </div>
          <button className="btn-shine px-8">+ New Product</button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Pending Orders', value: pendingOrders, color: 'text-[#FFB800]', bg: 'bg-yellow-50' },
            { label: 'Total Revenue', value: `$${totalSales.toLocaleString()}`, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'Active Streams', value: orders.filter(o => o.status === 'Processing').length, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Trust Score', value: '4.9/5', color: 'text-indigo-500', bg: 'bg-indigo-50' }
          ].map((s, i) => (
            <div key={i} className={`${s.bg} p-6 rounded-3xl border border-white shadow-soft`}>
              <p className="text-[9px] text-slate-400 uppercase font-black tracking-[0.2em] mb-2">{s.label}</p>
              <p className={`text-2xl font-black ${s.color} tracking-tighter`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="shine-card overflow-hidden border-none shadow-soft">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <h3 className="text-xs font-black uppercase tracking-widest">Active Listings</h3>
            <button className="text-[10px] text-[#FFB800] font-black uppercase tracking-widest hover:underline">Manage All</button>
          </div>
          <div className="p-6 space-y-4">
            {products.map((item) => (
              <div key={item._id} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-soft border border-slate-50 hover:border-[#FFD700] transition-all">
                <div className="flex items-center gap-4">
                  <img src={item.image || item.img} className="w-12 h-12 rounded-xl bg-slate-100 object-cover shadow-sm" />
                  <div>
                    <p className="text-[13px] font-black text-slate-900">{item.name}</p>
                    <p className="text-[11px] font-bold text-[#FFB800]">{item.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${item.stock === 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {item.stock} Units
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="shine-card overflow-hidden border-none shadow-soft">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <h3 className="text-xs font-black uppercase tracking-widest">Order Manifest</h3>
            <button className="text-[10px] text-[#FFB800] font-black uppercase tracking-widest hover:underline">Export Data</button>
          </div>
          <div className="p-6 space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-20 opacity-30">
                <ShoppingBag size={48} className="mx-auto mb-4 text-slate-300" />
                <p className="text-xs font-black uppercase tracking-widest">No Active Orders</p>
              </div>
            ) : (
              orders.slice(0, 5).map((order) => (
                <div key={order._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-white">
                  <div>
                    <p className="text-[11px] font-black text-slate-900 leading-none mb-1 uppercase tracking-tight">Order #{order._id.slice(-6)}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{order.product?.name || 'Global Resource'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-black text-emerald-600 mb-1">{order.totalPrice}</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{order.status || 'Verified'}</p>
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="shine-card p-10 max-w-[440px] w-full border-none shadow-2xl ring-8 ring-white/50"
      >
        <h3 className="text-2xl font-black mb-2 tracking-tight">Checkout</h3>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8">Confirming Global Acquisition</p>

        <div className="flex justify-between items-center mb-8 p-6 bg-slate-50 rounded-3xl border border-white">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Resource</p>
            <p className="text-sm font-black text-slate-900">{product.name}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total</p>
            <p className="text-2xl font-black text-[#FFB800]">{product.price}</p>
          </div>
        </div>

        <div className="space-y-3 mb-10">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Delivery Destination</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your international shipping address..."
            className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-4 px-5 focus:outline-none focus:ring-4 focus:ring-[#FFD700]/10 focus:bg-white focus:border-[#FFD700]/50 transition-all text-sm font-semibold h-32 resize-none"
          />
        </div>

        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Abort</button>
          <button
            onClick={handleConfirm}
            disabled={!address || loading}
            className="flex-1 btn-shine justify-center disabled:opacity-30"
          >
            {loading ? 'Transmitting...' : 'Finalize Order'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};


const RightPanel = () => (
  <div className="fixed right-0 top-20 bottom-0 w-96 p-10 hidden xl:block overflow-y-auto no-scrollbar">
    <div className="shine-card p-6 mb-8 border-none bg-gradient-to-br from-white to-amber-50/30">
      <h3 className="text-xs font-black mb-6 flex items-center gap-3 text-emerald-600 uppercase tracking-widest">
        <Users size={18} /> Rising Creators
      </h3>
      <div className="flex flex-col gap-6">
        {[
          { name: 'Elena Rodriguez', meta: 'Artist • Spain', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena' },
          { name: 'Kenji Sato', meta: 'Dev • Japan', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kenji' }
        ].map((person, i) => (
          <div key={i} className="flex items-center justify-between group cursor-pointer hover:translate-x-1 transition-transform">
            <div className="flex items-center gap-3">
              <img src={person.img} className="w-10 h-10 rounded-2xl bg-white shadow-soft p-0.5 border border-slate-100" />
              <div>
                <h4 className="text-[11px] font-black text-slate-900">{person.name}</h4>
                <p className="text-[9px] text-slate-400 font-bold uppercase">{person.meta}</p>
              </div>
            </div>
            <button className="text-[10px] font-black text-[#FFB800] uppercase tracking-tighter hover:underline">Connect</button>
          </div>
        ))}
      </div>
    </div>

    <div className="shine-card p-6 border-none bg-gradient-to-br from-blue-50 to-indigo-50/30">
      <div className="flex items-center gap-3 mb-4">
        <ShoppingBag size={20} className="text-blue-500 shadow-xl" />
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Global Hub</h3>
      </div>
      <p className="text-[11px] text-slate-500 font-medium mb-6 leading-relaxed">Exchange crafts, stories, and connections in our community marketplace.</p>
      <button className="w-full bg-slate-900 text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl">
        Explore World
      </button>
    </div>

    <div className="shine-card p-6 mt-8 border-none bg-gradient-to-br from-[#FFD700]/10 to-transparent">
      <h3 className="text-xs font-black mb-4 flex items-center gap-3 text-slate-900 uppercase tracking-widest">
        💰 Network Stats
      </h3>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">Total Impact</p>
          <p className="text-3xl font-black text-slate-900 tracking-tighter">$8.4M</p>
        </div>
        <div className="text-[10px] text-emerald-500 font-black">+14.2%</div>
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
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-100">
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
                      <div className="w-16 h-16 border-4 border-slate-200 border-t-[#FFD700] rounded-full animate-spin mx-auto mb-6 shadow-xl"></div>
                      <p className="text-xs font-black tracking-[0.2em] uppercase text-slate-500">Syncing Worldwide...</p>
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
