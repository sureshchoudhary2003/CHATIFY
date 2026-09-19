import React, { useEffect } from 'react'
import { Toaster } from "react-hot-toast";

import { Navigate, Route, Routes } from 'react-router'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { useAuthStore } from './store/useAuthStore.js'
import PageLoader from './components/PageLoader.jsx'
function App() {

  const {checkAuth, isCheckingAuth,authUser} = useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  console.log({authUser});
  
  if (isCheckingAuth) return <PageLoader />;
  return (
    <div className="h-[100dvh] w-full bg-slate-950 text-slate-100 overflow-hidden flex flex-col">
      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App