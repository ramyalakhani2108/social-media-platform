import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/mockAuthStore';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const { isAdmin } = useAuthStore();
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};