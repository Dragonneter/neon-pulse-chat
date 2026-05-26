import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { NeonButton } from '@/components/UIComponents';
import { Mail, Lock, User, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: 'user' | 'operator' | 'admin') => {
    if (!email) {
      toast.error('Please enter your email or ID');
      return;
    }
    login(email, role);
    toast.success(`Welcome back as ${role}!`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6 relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-pink/10 blur-[100px] rounded-full" />

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-gray-card/80 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black mb-2">Welcome</h2>
          <p className="text-white/40 text-sm">Choose your account type to login</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Email or Account ID"
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-neon-purple transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
            <input 
              type="password" 
              placeholder="Password"
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-neon-purple transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <NeonButton onClick={() => handleLogin('user')} className="w-full py-4 text-lg">
            <User className="w-5 h-5" /> Login as User
          </NeonButton>
          
          <div className="flex gap-4">
            <NeonButton 
              variant="secondary" 
              onClick={() => handleLogin('operator')} 
              className="flex-1 py-4"
            >
              <ShieldCheck className="w-5 h-5" /> Host Login
            </NeonButton>
            <NeonButton 
              variant="outline" 
              onClick={() => handleLogin('admin')} 
              className="flex-1 py-4"
            >
              Admin Panel
            </NeonButton>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/40 text-sm">
            Don't have an account? <span className="text-neon-purple font-bold cursor-pointer">Sign Up</span>
          </p>
          <p className="text-white/20 text-xs mt-4">Demo accounts: any email works</p>
        </div>
      </motion.div>
    </div>
  );
};