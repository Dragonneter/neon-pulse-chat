import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { ChevronLeft, Send, Image, Video, Gift, Smile, Flag, Lock, Coins } from 'lucide-react';
import { NeonButton } from '@/components/UIComponents';
import { toast } from 'sonner';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  type: 'text' | 'photo' | 'video' | 'gift';
  isLocked?: boolean;
}

export const ChatScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { chats } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const chat = chats.find(c => c.id === id);

  useEffect(() => {
    // Initial messages
    setMessages([
      { id: '1', senderId: 'other', text: `Hey ${user?.name}! 😊`, timestamp: new Date(Date.now() - 1000 * 60 * 5), type: 'text' },
      { id: '2', senderId: 'other', text: 'I have some private photos just for you, want to see?', timestamp: new Date(Date.now() - 1000 * 60 * 4), type: 'text' },
      { id: '3', senderId: 'other', text: 'private_photo_placeholder', timestamp: new Date(Date.now() - 1000 * 60 * 3), type: 'photo', isLocked: true },
    ]);
  }, [user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputText,
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "You're so sweet! ❤️",
        "Really? Tell me more...",
        "I sent you another surprise, check it out!",
        "Missing you already!",
        "Are you free to talk later?",
      ];
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: 'other',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: 'text',
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  const unlockMedia = (msgId: string) => {
    if (user && user.coins >= 100) {
      updateUser({ coins: user.coins - 100 });
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, isLocked: false } : m));
      toast.success('Media unlocked!');
    } else {
      toast.error('Not enough coins! Buy more in the shop.');
      navigate('/vip');
    }
  };

  if (!chat) return <div className="p-10">Chat not found</div>;

  return (
    <div className="h-screen bg-dark-bg flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center gap-4 bg-gray-card/50 backdrop-blur-md border-b border-white/5 sticky top-0 z-20">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <img src={chat.partnerAvatar} className="w-10 h-10 rounded-2xl object-cover" alt="Avatar" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-dark-bg rounded-full" />
          </div>
          <div>
            <h4 className="font-bold text-sm flex items-center gap-1">
              {chat.partnerName}
              <span className="text-[10px] bg-white/10 px-1 rounded">🇺🇸</span>
            </h4>
            <p className="text-[10px] text-green-500 font-bold uppercase">Online Now</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Gift className="w-5 h-5 text-neon-pink cursor-pointer" />
          <Flag className="w-5 h-5 text-white/20 cursor-pointer" />
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-3xl px-4 py-3 ${
              msg.senderId === 'me' 
                ? 'bg-neon-purple text-white rounded-tr-none glow-purple' 
                : 'bg-gray-card text-white/90 rounded-tl-none border border-white/5'
            }`}>
              {msg.type === 'text' && <p className="text-sm">{msg.text}</p>}
              
              {msg.type === 'photo' && (
                <div className="relative group overflow-hidden rounded-2xl">
                  {msg.isLocked ? (
                    <div className="relative">
                      <img 
                        src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d00712-018f-41f8-adae-a1d40d1806e5/private-media-placeholder-1-e7e4ec20-1779825991610.webp" 
                        className="w-48 h-64 object-cover blur-xl grayscale opacity-50"
                        alt="Locked"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                        <Lock className="w-8 h-8 text-neon-pink mb-2" />
                        <p className="text-xs font-bold mb-3 uppercase tracking-tighter">Private Media</p>
                        <NeonButton 
                          variant="secondary" 
                          className="px-3 py-1.5 text-[10px]"
                          onClick={() => unlockMedia(msg.id)}
                        >
                          <Coins className="w-3 h-3" /> 100 COINS
                        </NeonButton>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d00712-018f-41f8-adae-a1d40d1806e5/model-profile-3-b0ac7aba-1779825989231.webp" 
                      className="w-48 h-64 object-cover"
                      alt="Unlocked"
                    />
                  )}
                </div>
              )}
              <span className="text-[8px] opacity-40 mt-1 block text-right">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-card rounded-2xl px-4 py-3 border border-white/5">
              <div className="flex gap-1">
                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-gray-card/50 border-t border-white/5 pb-8">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10">
              <Image className="w-5 h-5 text-white/40" />
            </div>
            <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10">
              <Video className="w-5 h-5 text-white/40" />
            </div>
          </div>
          <div className="flex-1 relative">
            <input 
              type="text"
              placeholder="Type message..."
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 px-4 pr-10 text-sm focus:outline-none focus:border-neon-purple"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Smile className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 cursor-pointer" />
          </div>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            className="w-10 h-10 bg-neon-purple rounded-2xl flex items-center justify-center glow-purple shadow-neon"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};