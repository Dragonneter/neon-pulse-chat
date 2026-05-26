import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useApp, MOCK_MODELS } from '@/context/AppContext';
import { NeonCard, NeonButton } from '@/components/UIComponents';
import { MessageCircle, Users, Bell, Crown, Wallet, CheckSquare, Search, MoreVertical, Plus, ShieldCheck } from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  const { chats, models } = useApp();
  const navigate = useNavigate();

  if (user?.role === 'operator') return <OperatorDashboard />;
  if (user?.role === 'admin') return <AdminDashboard />;

  return (
    <div className="min-h-screen bg-dark-bg pb-24">
      {/* Header */}
      <div className="p-6 flex items-center justify-between sticky top-0 bg-dark-bg/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-neon-purple p-0.5 overflow-hidden">
            <img src={user?.avatar} alt="Avatar" className="w-full h-full rounded-full" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Hello, {user?.name}!</h3>
            <div className="flex items-center gap-1">
              <span className="text-neon-pink text-xs font-bold uppercase">Gold Member</span>
              <Crown className="w-3 h-3 text-neon-pink fill-neon-pink" />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-gray-card p-3 rounded-2xl relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-neon-pink rounded-full" />
          </div>
          <div className="bg-gray-card p-3 rounded-2xl cursor-pointer" onClick={() => navigate('/vip')}>
            <Wallet className="w-5 h-5 text-neon-purple" />
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search profiles or chats..."
            className="w-full bg-gray-card border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-neon-purple transition-colors"
          />
        </div>

        {/* Quick Stats / Actions */}
        <div className="grid grid-cols-2 gap-4">
          <NeonCard className="flex flex-col items-center justify-center py-6 gap-2">
            <div className="text-3xl font-black text-neon-purple">{user?.coins}</div>
            <div className="text-xs text-white/40 uppercase tracking-widest font-bold">Coins</div>
            <button className="text-[10px] text-neon-purple font-bold mt-1 cursor-pointer" onClick={() => navigate('/vip')}>BUY MORE +</button>
          </NeonCard>
          <NeonCard className="flex flex-col items-center justify-center py-6 gap-2">
            <div className="text-3xl font-black text-neon-pink">12</div>
            <div className="text-xs text-white/40 uppercase tracking-widest font-bold">Rewards</div>
            <button className="text-[10px] text-neon-pink font-bold mt-1 cursor-pointer" onClick={() => navigate('/tasks')}>CLAIM NOW</button>
          </NeonCard>
        </div>

        {/* Online Models */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-lg">Online Now</h4>
            <span className="text-neon-purple text-sm font-bold cursor-pointer">See All</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {models.map(model => (
              <div key={model.id} className="flex-shrink-0 flex flex-col items-center gap-2">
                <div className="relative">
                  <div className="w-16 h-16 rounded-3xl border-2 border-neon-purple p-1">
                    <img src={model.avatar} className="w-full h-full rounded-2xl object-cover" alt={model.name} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-dark-bg rounded-full" />
                </div>
                <span className="text-xs font-bold">{model.name}</span>
              </div>
            ))}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-3xl bg-gray-card border border-white/10 flex items-center justify-center cursor-pointer">
                <Plus className="w-6 h-6 text-white/40" />
              </div>
              <span className="text-xs text-white/40">Discover</span>
            </div>
          </div>
        </div>

        {/* Chats */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-lg">Messages</h4>
            <MoreVertical className="w-5 h-5 text-white/40" />
          </div>
          <div className="space-y-3">
            {chats.map(chat => (
              <motion.div 
                key={chat.id} 
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/chat/${chat.id}`)}
                className="bg-gray-card p-4 rounded-3xl border border-white/5 flex items-center gap-4 hover:border-neon-purple/30 transition-colors cursor-pointer"
              >
                <div className="relative">
                  <img src={chat.partnerAvatar} className="w-14 h-14 rounded-2xl object-cover" alt={chat.partnerName} />
                  {chat.isOnline && <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-card rounded-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h5 className="font-bold truncate">{chat.partnerName}</h5>
                    <span className="text-[10px] text-white/30">{chat.time}</span>
                  </div>
                  <p className="text-sm text-white/50 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unreadCount > 0 && (
                  <div className="w-6 h-6 bg-neon-purple rounded-full flex items-center justify-center text-[10px] font-bold shadow-neon">
                    {chat.unreadCount}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav active="home" />
    </div>
  );
};

const OperatorDashboard = () => {
  const { user } = useAuth();
  const { earnings, chats } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-bg pb-24">
      <div className="p-6 bg-gradient-to-b from-neon-purple/10 to-transparent">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black">Host Panel</h1>
            <p className="text-white/40 text-sm">Welcome back, {user?.name}</p>
          </div>
          <div className="bg-neon-purple p-4 rounded-3xl glow-purple text-center min-w-[120px]">
            <div className="text-xs font-bold uppercase tracking-wider opacity-70">Earnings</div>
            <div className="text-xl font-black">${earnings.toFixed(2)}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <NeonCard className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-neon-purple" />
              </div>
              <div>
                <div className="text-xl font-bold">1,240</div>
                <div className="text-xs text-white/40 uppercase font-bold">Followers</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-neon-pink" />
              </div>
              <div>
                <div className="text-xl font-bold">482</div>
                <div className="text-xs text-white/40 uppercase font-bold">Total Chats</div>
              </div>
            </div>
          </NeonCard>
        </div>
      </div>

      <div className="px-6 space-y-6">
        <NeonCard className="p-6 bg-neon-purple/5 border-neon-purple/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Active Profile</h3>
            <button className="text-xs font-bold text-neon-purple cursor-pointer" onClick={() => navigate('/profile-selection')}>SWITCH PROFILE</button>
          </div>
          <div className="flex items-center gap-4">
            <img src={MOCK_MODELS[0].avatar} className="w-16 h-16 rounded-2xl object-cover border-2 border-neon-purple" alt="Profile" />
            <div>
              <div className="text-lg font-bold">{MOCK_MODELS[0].name}</div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs text-green-500 font-bold">Online & Active</span>
              </div>
            </div>
          </div>
        </NeonCard>

        <div>
          <h4 className="font-bold text-lg mb-4">Pending Responses</h4>
          <div className="space-y-3">
            {chats.map(chat => (
              <div key={chat.id} onClick={() => navigate(`/chat/${chat.id}`)} className="bg-gray-card p-4 rounded-3xl border border-white/5 flex items-center gap-4 cursor-pointer">
                <img src={chat.partnerAvatar} className="w-12 h-12 rounded-2xl object-cover" alt="User" />
                <div className="flex-1">
                  <h5 className="font-bold text-sm">User_{chat.id}52</h5>
                  <p className="text-xs text-white/40">"How are you today?"</p>
                </div>
                <NeonButton className="px-4 py-2 text-xs">REPLY</NeonButton>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav active="home" role="operator" />
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-dark-bg p-6 pb-24">
      <h1 className="text-3xl font-black mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <NeonCard className="p-4 border-l-4 border-l-neon-purple">
          <div className="text-xs text-white/40 font-bold uppercase mb-1">Total Users</div>
          <div className="text-2xl font-black">42,501</div>
        </NeonCard>
        <NeonCard className="p-4 border-l-4 border-l-neon-pink">
          <div className="text-xs text-white/40 font-bold uppercase mb-1">Active Hosts</div>
          <div className="text-2xl font-black">156</div>
        </NeonCard>
        <NeonCard className="p-4 border-l-4 border-l-green-500">
          <div className="text-xs text-white/40 font-bold uppercase mb-1">Daily Revenue</div>
          <div className="text-2xl font-black">$4,290</div>
        </NeonCard>
        <NeonCard className="p-4 border-l-4 border-l-blue-500">
          <div className="text-xs text-white/40 font-bold uppercase mb-1">Reports</div>
          <div className="text-2xl font-black text-neon-pink">12</div>
        </NeonCard>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg">Quick Management</h3>
        <NeonButton className="w-full justify-start py-4">
          <Plus className="w-5 h-5" /> Add New Host Account
        </NeonButton>
        <NeonButton variant="outline" className="w-full justify-start py-4 border-white/10 text-white">
          <Users className="w-5 h-5 text-neon-pink" /> Manage Model Profiles
        </NeonButton>
        <NeonButton variant="outline" className="w-full justify-start py-4 border-white/10 text-white">
          <ShieldCheck className="w-5 h-5 text-neon-purple" /> Payment Approvals
        </NeonButton>
      </div>

      <div className="mt-8">
        <h3 className="font-bold text-lg mb-4">Live Monitoring</h3>
        <div className="space-y-3 opacity-50">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-3 bg-gray-card rounded-2xl border border-white/5 flex items-center justify-between">
              <div className="text-sm">Host_{i}3 ↔ User_{i}99</div>
              <div className="text-[10px] text-white/40">Simulated Feed</div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="home" role="admin" />
    </div>
  );
};

export const BottomNav = ({ active, role = 'user' }: { active: string, role?: string }) => {
  const navigate = useNavigate();
  
  const userItems = [
    { id: 'home', icon: MessageCircle, label: 'Chats', path: '/dashboard' },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { id: 'vip', icon: Crown, label: 'VIP', path: '/vip' },
    { id: 'profile', icon: Users, label: 'Me', path: '/login' },
  ];

  const operatorItems = [
    { id: 'home', icon: MessageCircle, label: 'Inbox', path: '/dashboard' },
    { id: 'models', icon: Users, label: 'Models', path: '/profile-selection' },
    { id: 'earnings', icon: Wallet, label: 'Earnings', path: '/earnings' },
    { id: 'profile', icon: Users, label: 'Me', path: '/login' },
  ];

  const items = role === 'operator' ? operatorItems : userItems;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-dark-bg/80 backdrop-blur-xl border-t border-white/5 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center px-4">
        {items.map(item => (
          <button 
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${active === item.id ? 'text-neon-purple scale-110' : 'text-white/40'}`}
          >
            <item.icon className={`w-6 h-6 ${active === item.id ? 'glow-purple shadow-neon' : ''}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};