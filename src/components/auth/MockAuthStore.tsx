import { useAuthStore } from '../../store/mockAuthStore';
import { useEffect } from 'react';

export const MockAuthStore = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    // Initialize with a mock user for testing
    if (!user) {
      setUser({
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
        is_admin: false,
      });
    }
  }, [user, setUser]);

  return <>{children}</>;
};
