import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';
import { AuthLayout } from './components/layout/AuthLayout';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Chatbot } from './pages/Chatbot';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Messages } from './pages/Messages';
import { Reels } from './pages/Reels';
import { Notifications } from './pages/Notifications';
import { Hashtag } from './pages/Hashtag';
import { useAuthStore } from './store/mockAuthStore';

// Wrapper component for protected routes
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// Admin check function for the Admin page
const AdminCheck = () => {
  const { isAdmin, isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Admin />;
};

function App() {
  return (
    <ThemeProvider attribute="class">
      <Router>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="reels" element={<Reels />} />
              <Route path="profile" element={<Profile />} />
              <Route path="messages" element={<Messages />} />
              <Route path="chatbot" element={<Chatbot />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="hashtag/:hashtag" element={<Hashtag />} />
              <Route path="admin" element={<AdminCheck />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;