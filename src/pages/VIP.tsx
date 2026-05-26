import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { NeonButton, NeonCard } from '@/components/UIComponents';
import { Check, Crown, Zap, Sparkles, Diamond, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

export const VIPScreen = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const plans = [
    { id: 'weekly', name: 'Weekly', price: '$9.99', duration: '7 Days', perks: ['Unlimited Chat', 'VIP Badge', '500 Bonus Coins'] },
    { id: 'monthly', name: 'Monthly', price: '$24.99', duration: '30 Days', perks: ['Everything in Weekly', 'Priority Support', 'Exclusive Content Access', '2000 Bonus Coins'], popular: true },
    { id: 'yearly', name: 'Yearly', price: '$99.99', duration: '365 Days', perks: ['All Features', 'Free Monthly Gifts', 'Save 60%', '10,000 Bonus Coins'] },
  ];

  const buyCoins = [
    { amount: 500, price: '$4.99' },
    { amount: 1200, price: '$9.99' },
    { amount: 3000, price: '$19.99' },
    { amount: 10000, price: '$49.99' },
  ];

  return (
    <div className="min-h-screen bg-dark-bg pb-24">
      <div className="p-6 bg-gradient-to-b from-neon-pink/10 to-transparent flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-6">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/5 rounded-xl cursor-pointer">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold">Premium Center</h2>
          <div className="w-10" />
        </div>

        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-20 h-20 bg-neon-pink/20 rounded-full flex items-center justify-center glow-pink border-2 border-neon-pink mb-4"
        >
          <Crown className="w-10 h-10 text-neon-pink fill-neon-pink" />
        </motion.div>
        
        <h1 className="text-3xl font-black mb-1">Glow VIP</h1>
        <p className="text-white/40 text-sm mb-8">Unlock exclusive world of connection</p>

        <div className="w-full space-y-4 mb-12">
          {plans.map((plan) => (
            <NeonCard key={plan.id} className={`relative p-6 ${plan.popular ? 'border-neon-pink/50' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 right-6 bg-neon-pink text-[10px] font-black uppercase px-3 py-1 rounded-full glow-pink">
                  Most Popular
                </div>
              )}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-xs text-white/40">{plan.duration}</p>
                </div>
                <div className="text-2xl font-black text-neon-pink">{plan.price}</div>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.perks.map((perk, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-white/70">
                    <Check className="w-4 h-4 text-green-500" /> {perk}
                  </li>
                ))}
              </ul>
              <NeonButton variant="secondary" className="w-full" onClick={() => {
                updateUser({ isVIP: true });
                toast.success(`Subscribed to ${plan.name}!`);
              }}>
                SUBSCRIBE NOW
              </NeonButton>
            </NeonCard>
          ))}
        </div>

        <div className="w-full">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-neon-purple" /> Get More Coins
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {buyCoins.map((coin, i) => (
              <NeonCard key={i} className="flex flex-col items-center p-4">
                <div className="text-neon-purple mb-2">
                  {i === 0 ? <Sparkles className="w-6 h-6" /> : <Diamond className="w-6 h-6" />}
                </div>
                <div className="text-xl font-black">{coin.amount}</div>
                <div className="text-[10px] text-white/40 font-bold uppercase mb-3">Coins</div>
                <button 
                  className="w-full py-2 bg-white/5 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => {
                    updateUser({ coins: (user?.coins || 0) + coin.amount });
                    toast.success(`Added ${coin.amount} coins!`);
                  }}
                >
                  {coin.price}
                </button>
              </NeonCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};