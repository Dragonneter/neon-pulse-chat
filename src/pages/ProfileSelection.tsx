import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { NeonCard, NeonButton } from '@/components/UIComponents';
import { ChevronLeft, Check, UserPlus } from 'lucide-react';

export const ProfileSelection = () => {
  const navigate = useNavigate();
  const { models, activeModelId, setActiveModelId } = useApp();

  return (
    <div className="min-h-screen bg-dark-bg p-6 pb-24">
      <div className="w-full flex justify-between items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/5 rounded-xl">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">Choose Profile</h2>
        <div className="w-10" />
      </div>

      <p className="text-white/40 text-sm mb-8">Select which profile you want to represent today. Your earnings will be tracked under this model.</p>

      <div className="grid grid-cols-1 gap-6">
        {models.map((model) => (
          <motion.div 
            key={model.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveModelId(model.id)}
            className={`relative rounded-[32px] overflow-hidden border-2 transition-all ${
              activeModelId === model.id ? 'border-neon-purple shadow-neon scale-[1.02]' : 'border-white/5 opacity-70'
            }`}
          >
            <div className="h-48 relative">
              <img src={model.avatar} className="w-full h-full object-cover" alt={model.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black">{model.name}</h3>
                  <span className="text-lg">{model.flag}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-2 h-2 rounded-full ${model.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{model.status}</span>
                </div>
              </div>
              {activeModelId === model.id && (
                <div className="absolute top-4 right-4 bg-neon-purple p-2 rounded-full glow-purple">
                  <Check className="w-5 h-5" />
                </div>
              )}
            </div>
            <div className="bg-gray-card p-4 flex justify-between items-center">
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-xs font-bold">12.5k</div>
                  <div className="text-[8px] text-white/40 uppercase font-bold">Fans</div>
                </div>
                <div className="text-center border-l border-white/10 pl-4">
                  <div className="text-xs font-bold">4.8</div>
                  <div className="text-[8px] text-white/40 uppercase font-bold">Rating</div>
                </div>
              </div>
              <NeonButton 
                variant={activeModelId === model.id ? 'primary' : 'outline'} 
                className="px-6 py-2 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveModelId(model.id);
                }}
              >
                {activeModelId === model.id ? 'ACTIVE' : 'SELECT'}
              </NeonButton>
            </div>
          </motion.div>
        ))}

        <NeonCard className="border-dashed border-2 border-white/10 bg-transparent py-10 flex flex-col items-center justify-center gap-4 text-center opacity-50">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
            <UserPlus className="w-8 h-8" />
          </div>
          <div>
            <div className="font-bold">Request New Profile</div>
            <p className="text-[10px] text-white/40">Admin approval required</p>
          </div>
        </NeonCard>
      </div>
    </div>
  );
};