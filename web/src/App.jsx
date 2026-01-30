import React, { useState, useEffect } from 'react';
import {
  Home,
  MessageCircle,
  Users,
  Settings,
  Bell,
  Search,
  PlusSquare,
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
import Auth from './components/Auth';

const Navbar = ({ setActiveTab }) => (

  <nav className="fixed top-0 left-0 right-0 h-16 glass-morphism z-50 px-6 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-[#FF9900] rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
        <Globe className="text-white" size={24} />
      </div>
      <h1 className="text-xl font-bold tracking-tight hidden md:block">
        Gipjazes<span className="text-[#FF9900]"> Connect</span>
      </h1>
    </div>

    <div className="flex-1 max-w-md mx-8 hidden md:block">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Explore the world..."
          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF9900]/50 transition-all font-light"
        />
      </div>
    </div>

    <div className="flex items-center gap-4">
      <button className="p-2 hover:bg-slate-800 rounded-full transition-colors relative">
        <Bell size={20} className="text-slate-300" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
      </button>
      <button className="p-2 hover:bg-slate-800 rounded-full transition-colors">
        <MessageCircle size={20} className="text-slate-300" />
      </button>
      <div className="relative group cursor-pointer" onClick={() => setActiveTab('profile')}>
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-9 h-9 rounded-full border-2 border-[#FF9900]" />
        <span className="absolute -bottom-1 -right-1 bg-[#FF9900] text-[8px] font-bold px-1 rounded-sm border border-slate-900">PRO</span>
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
    { id: 'merchants', icon: <Calendar size={22} />, label: 'Merchant Center' },
    { id: 'chat', icon: <ShieldCheck size={22} />, label: 'Encrypted Chat' },
    { id: 'analytics', icon: <Settings size={22} />, label: 'Analytics' },
  ];


  return (
    <div className="fixed left-0 top-16 bottom-0 w-64 p-6 hidden lg:block">
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-4 p-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-[#FF9900] text-white shadow-lg shadow-orange-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>


      <div className="mt-12">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Trending Cultures</h3>
        <div className="flex flex-col gap-3">
          {['#LunarNewYear', '#Carnival2026', '#GlobalKitchen'].map(tag => (
            <a key={tag} href="#" className="text-sm text-slate-400 hover:text-[#3CB371] transition-colors">{tag}</a>
          ))}
        </div>
      </div>
    </div>
  );
};

const PostContent = ({ author, time, content, image, likes, comments }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-morphism p-5 mb-6"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`} alt={author} className="w-10 h-10 rounded-full border border-slate-700" />
        <div>
          <h4 className="font-semibold text-sm">{author}</h4>
          <p className="text-xs text-slate-500">{time}</p>
        </div>
      </div>
      <button className="text-slate-500 hover:text-white"><PlusSquare size={20} /></button>
    </div>

    <p className="text-sm text-slate-300 mb-4 leading-relaxed">{content}</p>

    {image && (
      <div className="rounded-xl overflow-hidden mb-4 border border-slate-700/50">
        <img src={image} alt="Post media" className="w-full object-cover max-h-[400px]" />
      </div>
    )}

    <div className="flex items-center gap-6 pt-4 border-t border-slate-700/50">
      <button className="flex items-center gap-2 text-slate-400 hover:text-[#FF9900] transition-colors transition-transform active:scale-90">
        <Heart size={20} />
        <span className="text-xs font-medium">{likes}</span>
      </button>
      <button className="flex items-center gap-2 text-slate-400 hover:text-[#3CB371] transition-colors">
        <MessageSquare size={20} />
        <span className="text-xs font-medium">{comments}</span>
      </button>
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF9900]/10 text-[#FF9900] hover:bg-[#FF9900] hover:text-white transition-all text-xs font-bold border border-[#FF9900]/20">
        Tip $5
      </button>
      {author === 'Global Brand' && (
        <span className="flex items-center gap-1 text-[9px] font-bold text-blue-400 border border-blue-400/30 px-2 py-0.5 rounded uppercase">
          Sponsored
        </span>
      )}
      <button className="flex items-center gap-2 text-slate-400 hover:text-white ml-auto">
        <Share2 size={20} />
      </button>
    </div>
  </motion.div>
);

const CreatePost = ({ addPost }) => {
  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePost = () => {
    if (!text && !selectedImage) return;
    addPost({
      author: 'Felix',
      time: 'Just now • Global',
      content: text,
      image: selectedImage,
      likes: '0',
      comments: '0'
    });
    setText('');
    setSelectedImage(null);
  };

  const simulateUpload = () => {
    // Array of beautiful cultural images
    const images = [
      'https://images.unsplash.com/photo-1548013146-72479768bbaa?w=800', // Taj Mahal
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800', // Camping
      'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?w=800'  // Mountains
    ];
    setSelectedImage(images[Math.floor(Math.random() * images.length)]);
  };

  return (
    <div className="glass-morphism p-5 mb-8">
      <div className="flex gap-4 mb-4">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" className="w-10 h-10 rounded-full" />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share a cultural moment or news..."
          className="flex-1 bg-transparent border-none focus:ring-0 resize-none pt-2 text-sm text-slate-200"
          rows="2"
        ></textarea>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative mb-4 group"
          >
            <img src={selectedImage} className="w-full h-40 object-cover rounded-xl" alt="Preview" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-slate-900/80 p-1 rounded-full text-white hover:bg-red-500 transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={simulateUpload}
            className="p-2 hover:bg-slate-800 rounded-lg text-[#3CB371] flex items-center gap-1 text-[10px] font-bold"
          >
            <PlusSquare size={20} /> Add Image
          </button>
          <button className="p-2 hover:bg-slate-800 rounded-lg text-[#FF9900]"><Globe size={20} /></button>
        </div>
        <button
          onClick={handlePost}
          disabled={!text && !selectedImage}
          className="btn-primary py-2 px-6 text-sm disabled:opacity-50"
        >
          Post Globally
        </button>
      </div>
    </div>
  );
};


const Chat = () => (
  <div className="flex flex-col h-[calc(100vh-12rem)] glass-morphism overflow-hidden">
    <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#3CB371]/20 flex items-center justify-center text-[#3CB371]">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h3 className="text-sm font-bold">Secure Global Chat</h3>
          <p className="text-[10px] text-[#3CB371] font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3CB371] animate-pulse"></span> End-to-end encrypted
          </p>
        </div>
      </div>
      <button className="text-slate-400 hover:text-white"><Settings size={18} /></button>
    </div>

    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="flex justify-center mb-4">
        <span className="text-[10px] bg-slate-800 text-slate-500 px-3 py-1 rounded-full border border-slate-700">Today</span>
      </div>

      {[
        { from: 'Marco', text: 'Hey Felix! Have you seen the new marketplace items?', time: '10:24 AM' },
        { from: 'You', text: 'Not yet! Checking them out now. The security on this app is insane.', time: '10:25 AM', self: true },
        { from: 'Marco', text: 'Yeah, the E2E encryption is legit. 🔒', time: '10:26 AM' }
      ].map((msg, i) => (
        <div key={i} className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.self ? 'bg-[#FF9900] text-white rounded-br-none' : 'glass-morphism rounded-bl-none'}`}>
            {!msg.self && <p className="text-[10px] font-bold mb-1 text-[#3CB371] uppercase">{msg.from}</p>}
            <p className="leading-relaxed">{msg.text}</p>
            <p className={`text-[9px] mt-1 ${msg.self ? 'text-orange-100' : 'text-slate-500'}`}>{msg.time}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
      <div className="relative">
        <input
          type="text"
          placeholder="Secure message..."
          className="w-full bg-slate-800/80 border border-slate-700 rounded-full py-3 px-5 pr-12 focus:outline-none focus:ring-1 focus:ring-[#3CB371] text-sm"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#3CB371] p-2 rounded-full text-white shadow-lg shadow-green-500/20">
          <MessageSquare size={16} />
        </button>
      </div>
    </div>
  </div>
);

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

const Marketplace = () => (

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      { name: 'Handcrafted Vase', price: '$45', origin: 'Mexico', img: 'https://images.unsplash.com/photo-1612196808214-b9e1d614e38c?w=400' },
      { name: 'Silk Scarf', price: '$30', origin: 'India', img: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400' },
      { name: 'Coffee Beans', price: '$25', origin: 'Ethiopia', img: 'https://images.unsplash.com/photo-1559056191-7440026e952d?w=400' },
      { name: 'Wood Carving', price: '$60', origin: 'Kenya', img: 'https://images.unsplash.com/photo-1605722243479-7df93f550117?w=400' }
    ].map((item, i) => (
      <motion.div
        key={i}
        whileHover={{ y: -5 }}
        className="glass-morphism overflow-hidden group"
      >
        <div className="h-40 overflow-hidden">
          <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-bold text-sm">{item.name}</h4>
            <span className="text-[#3CB371] font-bold">{item.price}</span>
          </div>
          <p className="text-xs text-slate-500">Origin: {item.origin}</p>
          <button className="w-full mt-4 btn-primary py-2 text-xs justify-center bg-slate-800 hover:bg-[#FF9900] border-none">
            View Details
          </button>
        </div>
      </motion.div>
    ))}
  </div>
);

const MerchantCenter = () => (
  <div className="space-y-6">
    <div className="glass-morphism p-6 bg-gradient-to-r from-[#2F4F7F]/20 to-transparent">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Merchant Hub</h2>
          <p className="text-xs text-slate-400">Manage your global inventory & fulfillment</p>
        </div>
        <button className="btn-primary py-2 px-4 text-xs">+ List New Product</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending Orders', value: '24', color: 'text-[#FF9900]' },
          { label: 'Total Sales', value: '$8,420', color: 'text-[#3CB371]' },
          { label: 'Processing', value: '12', color: 'text-blue-400' },
          { label: 'Avg Rating', value: '4.9/5', color: 'text-yellow-400' }
        ].map((s, i) => (
          <div key={i} className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/30">
            <p className="text-[8px] text-slate-500 uppercase font-bold mb-1">{s.label}</p>
            <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="glass-morphism overflow-hidden">
      <div className="p-4 border-b border-slate-700/50 flex justify-between items-center">
        <h3 className="text-sm font-bold">Active Listings</h3>
        <button className="text-[10px] text-[#FF9900] font-bold">View Inventory</button>
      </div>
      <div className="p-4 space-y-3">
        {[
          { name: 'Pure Silk Scarf', stock: 15, sales: 84, status: 'In Stock' },
          { name: 'Ceramic Vase (Limited)', stock: 3, sales: 12, status: 'Low Stock' },
          { name: 'Ethiopian Coffee', stock: 0, sales: 342, status: 'Sold Out' }
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-slate-800/20 rounded-lg hover:bg-slate-800/40 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-slate-700"></div>
              <div>
                <p className="text-xs font-bold">{item.name}</p>
                <p className="text-[10px] text-slate-500">{item.sales} units sold</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-[10px] font-bold ${item.stock === 0 ? 'text-red-500' : 'text-[#3CB371]'}`}>{item.status}</p>
              <p className="text-[9px] text-slate-500">{item.stock} left</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const RightPanel = () => (


  <div className="fixed right-0 top-16 bottom-0 w-80 p-6 hidden xl:block">
    <div className="glass-morphism p-5 mb-6">
      <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-[#3CB371]">
        <Calendar size={18} /> Upcoming Global Events
      </h3>
      <div className="flex flex-col gap-4">
        {[
          { title: 'Paris Fashion Week Buzz', meta: 'Live in 2h', color: 'orange' },
          { title: 'Global Tech Summit', meta: 'Tomorrow', color: 'green' }
        ].map((event, i) => (
          <div key={i} className="flex flex-col gap-1 border-l-2 border-slate-700 pl-3 py-1 hover:border-[#FF9900] transition-colors cursor-pointer">
            <h4 className="text-xs font-semibold">{event.title}</h4>
            <span className="text-[10px] text-slate-500">{event.meta}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="glass-morphism p-5 bg-gradient-to-br from-[#2F4F7F]/40 to-slate-900 border-[#2F4F7F]/30">
      <div className="flex items-center gap-2 mb-3">
        <ShoppingBag size={18} className="text-[#FF9900]" />
        <h3 className="text-sm font-bold">Gipjazes Marketplace</h3>
      </div>
      <p className="text-xs text-slate-400 mb-4">Discover unique crafts from around the world.</p>
      <button className="w-full bg-[#3CB371] hover:bg-[#2E8B57] text-white py-2 rounded-lg text-xs font-bold transition-colors">
        Browse items
      </button>
    </div>

    <div className="glass-morphism p-5 mt-6 border-l-4 border-blue-500 bg-blue-500/5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400">Sponsored Ad</h3>
        <PlusSquare size={14} className="text-slate-600" />
      </div>
      <div className="rounded-xl overflow-hidden mb-3 aspect-video">
        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" className="w-full h-full object-cover" alt="Ad" />
      </div>
      <h4 className="text-xs font-bold mb-1">New Gen-Z Smartwatch</h4>
      <p className="text-[10px] text-slate-400 mb-3">Sync your cultural vibes with the new Gipjazes Connect Watch Edition. Pre-order now!</p>
      <button className="w-full py-1.5 border border-blue-500 text-blue-400 rounded-lg text-[9px] font-bold hover:bg-blue-500 hover:text-white transition-all">
        Learn More
      </button>
    </div>

    <div className="glass-morphism p-5 mt-6 border-l-4 border-[#FF9900] bg-orange-500/5">
      <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
        💰 Revenue Insights
      </h3>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Today's Commission</p>
          <p className="text-xl font-bold text-[#FF9900]">$4,290.50</p>
        </div>
        <div className="text-[10px] text-[#3CB371] font-bold">+12.4%</div>
      </div>
      <p className="text-[10px] text-slate-500 mt-2 italic">Gipjazes Connect is growing fast!</p>
    </div>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [feedPosts, setFeedPosts] = useState([
    {
      author: "Elena",
      time: "2 hours ago • Spain",
      content: "Enjoying the vibrant streets of Barcelona today! The architecture here never fails to inspire. 🎨🇪🇸 #Travel #Culture",
      image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
      likes: "1.2k",
      comments: "48"
    },
    {
      author: "Kenji",
      time: "5 hours ago • Tokyo",
      content: "Just finished a new piece of digital art inspired by cyberpunk aesthetics. What do you think? 🤖✨",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
      likes: "856",
      comments: "12"
    },
    {
      author: "Global Brand",
      time: "Sponsored • USA",
      content: "Experience the world like never before with our premium travel gear. Use code GIPJAZES10 for a discount! 🎒🗺️",
      image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800",
      likes: "15k",
      comments: "1.2k"
    }

  ]);

  const addPost = (newPost) => {
    setFeedPosts([newPost, ...feedPosts]);
    addNotification('success', 'Post published globally! 🌍');
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

  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications(prev => [{ id, type, message }, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  if (!user) {
    return <Auth onLogin={(userData) => setUser(userData)} />;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200">
      <Navbar setActiveTab={setActiveTab} />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pt-24 px-6 lg:ml-64 xl:mr-80 max-w-2xl mx-auto">
        {activeTab === 'feed' ? (
          <>
            <CreatePost addPost={addPost} />
            <div className="flex flex-col">
              {feedPosts.map((post, idx) => (
                <PostContent
                  key={idx}
                  author={post.author}
                  time={post.time}
                  content={post.content}
                  image={post.image}
                  likes={post.likes}
                  comments={post.comments}
                />
              ))}
            </div>
          </>
        ) : activeTab === 'marketplace' ? (
          <div className="pb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Gipjazes Marketplace</h2>
              <div className="flex gap-2">
                <button className="p-2 glass-morphism text-xs px-4">Filters</button>
                <button className="p-2 glass-morphism text-xs px-4">My Orders</button>
              </div>
            </div>
            <Marketplace />
          </div>
        ) : activeTab === 'merchants' ? (
          <MerchantCenter />
        ) : activeTab === 'chat' ? (
          <Chat />
        ) : activeTab === 'groups' ? (
          <Groups />
        ) : activeTab === 'profile' ? (
          <Profile />
        ) : activeTab === 'analytics' ? (
          <Analytics />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-50">
            <Globe size={48} className="mb-4 text-[#FF9900]" />
            <p className="text-lg font-medium">Coming soon to your region...</p>
          </div>
        )}

      </main>
      <RightPanel />

      {/* System Status Indicator */}
      <div className="fixed bottom-1.5 left-6 z-50 flex items-center gap-2 opacity-30 hover:opacity-100 transition-opacity cursor-default">
        <div className="w-1.5 h-1.5 rounded-full bg-[#3CB371] animate-pulse"></div>
        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Gipjazes Connect Core v1.0.4 // Systems Nominal</span>
      </div>

      {/* Real-time Notification Toasts */}

      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`p-4 rounded-xl shadow-2xl glass-morphism border-l-4 pointer-events-auto min-w-[300px] ${n.type === 'success' ? 'border-[#3CB371]' : 'border-[#FF9900]'
                }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${n.type === 'success' ? 'bg-[#3CB371]/20 text-[#3CB371]' : 'bg-[#FF9900]/20 text-[#FF9900]'}`}>
                  {n.type === 'success' ? <Heart size={18} /> : <Globe size={18} />}
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    {n.type === 'success' ? 'Earnings' : 'Global Buzz'}
                  </p>
                  <p className="text-sm text-slate-200">{n.message}</p>
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
