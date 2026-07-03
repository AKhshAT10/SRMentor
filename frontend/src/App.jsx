import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore';

function App() {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // The landing page has its own full-bleed header, so hide the app navbar there
  const hideNav = location.pathname === "/";

  if (isCheckingAuth && !authUser) return (
    <div data-theme={theme} className='flex items-center justify-center h-screen bg-base-100'>
      <Loader className='size-10 animate-spin text-primary' />
    </div>
  );

  return (
    <div data-theme={theme} className='min-h-screen bg-base-100'>

      {!hideNav && <NavBar />}

      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/chat' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/chat' />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/chat' />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
      </Routes>

      <Toaster position="top-center" />

    </div>
  );
};

export default App;
