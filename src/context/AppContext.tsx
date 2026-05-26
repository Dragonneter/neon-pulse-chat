import React, { createContext, useContext, useState } from 'react';

export interface Model {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  country: string;
  flag: string;
}

export interface Chat {
  id: string;
  partnerName: string;
  partnerAvatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isOnline: boolean;
}

export const MOCK_MODELS: Model[] = [
  { id: '1', name: 'Elena', avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d00712-018f-41f8-adae-a1d40d1806e5/model-profile-1-f7a52f67-1779825989082.webp', status: 'online', country: 'Russia', flag: '🇷🇺' },
  { id: '2', name: 'Marco', avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d00712-018f-41f8-adae-a1d40d1806e5/model-profile-2-25f9ae1d-1779825988803.webp', status: 'online', country: 'Italy', flag: '🇮🇹' },
  { id: '3', name: 'Aria', avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d00712-018f-41f8-adae-a1d40d1806e5/model-profile-3-b0ac7aba-1779825989231.webp', status: 'busy', country: 'USA', flag: '🇺🇸' },
  { id: '4', name: 'Sophie', avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d00712-018f-41f8-adae-a1d40d1806e5/model-profile-4-266099e1-1779825989377.webp', status: 'online', country: 'France', flag: '🇫🇷' },
  { id: '5', name: 'Kenji', avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/49d00712-018f-41f8-adae-a1d40d1806e5/model-profile-5-f632ec80-1779825991531.webp', status: 'offline', country: 'Japan', flag: '🇯🇵' },
];

export const MOCK_CHATS: Chat[] = [
  { id: '1', partnerName: 'Elena', partnerAvatar: MOCK_MODELS[0].avatar, lastMessage: 'Hey! Want to see more?', time: '2m ago', unreadCount: 2, isOnline: true },
  { id: '2', partnerName: 'Sophie', partnerAvatar: MOCK_MODELS[3].avatar, lastMessage: 'That was so fun!', time: '15m ago', unreadCount: 0, isOnline: true },
  { id: '3', partnerName: 'Marco', partnerAvatar: MOCK_MODELS[1].avatar, lastMessage: 'Sent you a gift 🎁', time: '1h ago', unreadCount: 0, isOnline: true },
];

interface AppContextType {
  models: Model[];
  chats: Chat[];
  activeModelId: string | null;
  setActiveModelId: (id: string | null) => void;
  earnings: number;
  addEarnings: (amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModelId, setActiveModelId] = useState<string | null>(null);
  const [earnings, setEarnings] = useState(124.50);

  const addEarnings = (amount: number) => {
    setEarnings(prev => prev + amount);
  };

  return (
    <AppContext.Provider value={{ 
      models: MOCK_MODELS, 
      chats: MOCK_CHATS, 
      activeModelId, 
      setActiveModelId,
      earnings,
      addEarnings
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};