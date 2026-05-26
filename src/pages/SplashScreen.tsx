import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const SplashScreen = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        if (user) {
          navigate('/dashboard');
        } else {
          navigate('/login');
        }
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Particles Simulation */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{ 
              opacity: [0, 0.5, 0], 
              y: -100, 
              x: Math.random() * 400 - 200 
            }}
            transition={{ 
              duration: 2 + Math.random() * 2, 
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute bottom-0 left-1/2 w-1 h-1 bg-neon-purple rounded-full blur-[1px]"
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="w-32 h-32 bg-neon-purple/20 rounded-full flex items-center justify-center glow-purple border-2 border-neon-purple mb-6">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d00712-018f-41f8-adae-a1d40d1806e5/glowchat-logo-splash-ee69325b-1779825988881.webp" 
            alt="GlowChat Logo" 
            className="w-24 h-24 object-contain rounded-full"
          />
        </div>
        <motion.h1 
          className="text-5xl font-black neon-text-purple tracking-tighter"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          GlowChat
        </motion.h1>
        <p className="text-white/60 mt-2 font-medium tracking-widest text-xs uppercase">Connect Beyond Borders</p>
      </motion.div>

      <div className="absolute bottom-12 w-full flex justify-center">
        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-neon-purple glow-purple"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2 }}
          />
        </div>
      </div>
    </div>
  );
};