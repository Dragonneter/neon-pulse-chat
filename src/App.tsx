import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { SplashScreen } from './pages/SplashScreen';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ChatScreen } from './pages/Chat';
import { VIPScreen } from './pages/VIP';
import { TaskCenter } from './pages/TaskCenter';
import { Earnings } from './pages/Earnings';
import { ProfileSelection } from './pages/ProfileSelection';
import { Toaster } from 'sonner';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/chat/:id" element={<PrivateRoute><ChatScreen /></PrivateRoute>} />
      <Route path="/vip" element={<PrivateRoute><VIPScreen /></PrivateRoute>} />
      <Route path="/tasks" element={<PrivateRoute><TaskCenter /></PrivateRoute>} />
      <Route path="/earnings" element={<PrivateRoute><Earnings /></PrivateRoute>} />
      <Route path="/profile-selection" element={<PrivateRoute><ProfileSelection /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <div className="max-w-md mx-auto min-h-screen bg-dark-bg shadow-2xl relative overflow-x-hidden">
            <AppRoutes />
          </div>
          <Toaster position="top-center" theme="dark" richColors />
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;