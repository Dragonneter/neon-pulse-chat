import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { NeonCard, NeonButton } from '@/components/UIComponents';
import { Trophy, Gift, Calendar, Share2, MessageSquare, ChevronLeft, Star } from 'lucide-react';
import { toast } from 'sonner';

export const TaskCenter = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const tasks = [
    { id: '1', title: 'Daily Login', reward: '50 Coins', icon: Calendar, completed: true },
    { id: '2', title: 'Send 5 Messages', reward: '100 Coins', icon: MessageSquare, progress: '3/5', completed: false },
    { id: '3', title: 'Invite a Friend', reward: '500 Coins', icon: Share2, completed: false },
    { id: '4', title: 'Spend 10 mins Online', reward: 'VIP Point', icon: Star, progress: '8:42', completed: false },
  ];

  return (
    <div className="min-h-screen bg-dark-bg pb-24">
      <div className="p-6 bg-gradient-to-b from-neon-purple/10 to-transparent">
        <div className="w-full flex justify-between items-center mb-8">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/5 rounded-xl">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold">Task Center</h2>
          <div className="w-10" />
        </div>

        <div className="bg-gray-card p-6 rounded-[40px] border border-white/5 relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 p-4">
            <Trophy className="w-16 h-16 text-neon-purple opacity-20" />
          </div>
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Your Progress</h3>
          <div className="text-3xl font-black mb-4">Level 12</div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-2">
            <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} className="h-full bg-neon-purple glow-purple" />
          </div>
          <div className="text-[10px] text-white/40 flex justify-between uppercase font-bold">
            <span>650 XP</span>
            <span>1000 XP for Level 13</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-bold">Daily Tasks</h4>
            <span className="text-xs text-neon-purple font-bold">Refreshes in 14:20:05</span>
          </div>
          
          {tasks.map((task) => (
            <NeonCard key={task.id} className="flex items-center gap-4 p-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${task.completed ? 'bg-green-500/10' : 'bg-white/5'}`}>
                <task.icon className={`w-6 h-6 ${task.completed ? 'text-green-500' : 'text-neon-purple'}`} />
              </div>
              <div className="flex-1">
                <h5 className="font-bold text-sm">{task.title}</h5>
                <div className="flex items-center gap-2">
                  <Gift className="w-3 h-3 text-neon-pink" />
                  <span className="text-[10px] font-bold text-neon-pink uppercase">{task.reward}</span>
                  {task.progress && <span className="text-[10px] text-white/30">• {task.progress}</span>}
                </div>
              </div>
              {task.completed ? (
                <div className="text-[10px] font-black text-green-500 uppercase">Claimed</div>
              ) : (
                <NeonButton 
                  className="px-4 py-2 text-[10px]"
                  onClick={() => {
                    updateUser({ coins: (user?.coins || 0) + 50 });
                    toast.success('Reward claimed!');
                  }}
                >
                  CLAIM
                </NeonButton>
              )}
            </NeonCard>
          ))}
        </div>
      </div>
    </div>
  );
};