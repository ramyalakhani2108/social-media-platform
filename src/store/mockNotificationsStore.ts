import { create } from 'zustand';
import { notificationService } from '../services/notificationService';

interface Notification {
  id: string;
  type: string;
  from_user: {
    id: string;
    username: string;
    avatar_url: string;
    isVerified?: boolean;
    isFollowing?: boolean;
  };
  post?: {
    id: string;
    media_url: string;
    caption: string;
  };
  timestamp: string;
  read: boolean;
  content?: string;
}

interface NotificationsStore {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Notification) => void;
  toggleFollow: (userId: string) => void;
}

export const useNotificationsStore = create<NotificationsStore>((set) => ({
  notifications: notificationService.mockNotifications.map((n, index) => ({
    ...n,
    id: Date.now().toString() + index.toString(),
    post: n.post ? {
      ...n.post,
      caption: n.post.caption || ''
    } : undefined,
    from_user: {
      ...n.from_user,
      isFollowing: false
    }
  })),
  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },
  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    }));
  },
  addNotification: (notification) => {
    set((state) => ({
      notifications: [...state.notifications, notification],
    }));
  },
  toggleFollow: (userId: string) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.from_user.id === userId
          ? {
              ...n,
              from_user: {
                ...n.from_user,
                isFollowing: !n.from_user.isFollowing
              }
            }
          : n
      ),
    }));
  },
}));
