import { BrowserRouter as Router, Routes as RoutesComponent, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';
import { ApolloProvider } from '@apollo/client';
import { client } from './lib/apollo-client';
import { AuthProvider } from './hooks/useAuth';
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
import { Settings } from './pages/Settings';
import Friends from './pages/Friends';
import Saved from './pages/Saved';
import { useAuthStore } from './store/authStore';

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
  const { user, isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Admin />;
};

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ThemeProvider attribute="class">
          <Router>
            <RoutesComponent>
              <Route element={<AuthLayout />}>
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
                <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" replace />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="reels" element={<Reels />} />
                  <Route path="profile/:userId" element={<Profile />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="chatbot" element={<Chatbot />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="hashtag/:hashtag" element={<Hashtag />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="friends" element={<Friends />} />
                  <Route path="saved" element={<Saved />} />
                  <Route path="admin" element={<AdminCheck />} />
                </Route>
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </RoutesComponent>
            <Toaster />
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;