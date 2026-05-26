import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { NeonCard, NeonButton } from '@/components/UIComponents';
import { TrendingUp, PieChart, ArrowUpRight, Clock, ChevronLeft } from 'lucide-react';

export const Earnings = () => {
  const navigate = useNavigate();
  const { earnings } = useApp();

  const history = [
    { id: 1, type: 'Chat Bonus', amount: '+$5.20', time: '10m ago', status: 'completed' },
    { id: 2, type: 'Media Unlock', amount: '+$2.50', time: '1h ago', status: 'completed' },
    { id: 3, type: 'Gift Received', amount: '+$12.00', time: '3h ago', status: 'pending' },
    { id: 4, type: 'Chat Bonus', amount: '+$4.80', time: '5h ago', status: 'completed' },
  ];

  return (
    <div className="min-h-screen bg-dark-bg pb-24 p-6">
      <div className="w-full flex justify-between items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/5 rounded-xl">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">Earnings Report</h2>
        <div className="w-10" />
      </div>

      <NeonCard className="bg-gradient-to-br from-neon-purple/20 to-neon-pink/10 p-8 mb-8 border-none relative overflow-hidden">
        <div className="relative z-10 text-center">
          <div className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Total Balance</div>
          <div className="text-5xl font-black mb-6">${earnings.toFixed(2)}</div>
          <div className="flex gap-4">
            <NeonButton className="flex-1 py-3 bg-white text-black hover:bg-white/90">WITHDRAW</NeonButton>
            <button className="flex-1 py-3 bg-white/10 rounded-2xl font-bold border border-white/10">DETAILS</button>
          </div>
        </div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-20 -right-20 w-64 h-64 bg-neon-purple/20 blur-[60px] rounded-full"
        />
      </NeonCard>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <NeonCard className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-[10px] font-bold text-white/40 uppercase">This Week</span>
          </div>
          <div className="text-xl font-black">$452.80</div>
          <div className="text-[10px] text-green-500 font-bold">+12% vs last week</div>
        </NeonCard>
        <NeonCard className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="w-4 h-4 text-neon-pink" />
            <span className="text-[10px] font-bold text-white/40 uppercase">Avg Daily</span>
          </div>
          <div className="text-xl font-black">$64.70</div>
          <div className="text-[10px] text-white/30">Stable activity</div>
        </NeonCard>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-bold">Recent Transactions</h4>
          <span className="text-xs text-white/40">View All</span>
        </div>
        {history.map(item => (
          <div key={item.id} className="bg-gray-card p-4 rounded-3xl border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                {item.status === 'completed' ? <ArrowUpRight className="w-5 h-5 text-green-500" /> : <Clock className="w-5 h-5 text-neon-pink" />}
              </div>
              <div>
                <div className="text-sm font-bold">{item.type}</div>
                <div className="text-[10px] text-white/40">{item.time}</div>
              </div>
            </div>
            <div className="text-right">
              <div className={`font-black ${item.status === 'completed' ? 'text-white' : 'text-neon-pink'}`}>{item.amount}</div>
              <div className="text-[8px] uppercase font-bold opacity-40">{item.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};