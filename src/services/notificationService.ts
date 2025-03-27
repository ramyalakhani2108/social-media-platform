import { useNotificationsStore } from '../store/mockNotificationsStore';

export interface NotificationSettings {
  likes: boolean;
  comments: boolean;
  follows: boolean;
  mentions: boolean;
  sounds: boolean;
}

export interface NotificationPayload {
  type: string;
  from_user: {
    id: string;
    username: string;
    avatar_url: string;
    isVerified?: boolean;
    bio?: string;
    location?: string;
    website?: string;
    is_admin?: boolean;
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
  id?: string;
}

export class NotificationService {
  private settings: NotificationSettings = {
    likes: true,
    comments: true,
    follows: true,
    mentions: true,
    sounds: true,
  };

  public mockNotifications: NotificationPayload[] = [
    {
      type: 'follow',
      from_user: {
        id: '1',
        username: 'john_doe',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=john',
        isVerified: true,
        isFollowing: false
      },
      timestamp: '2024-03-26T12:00:00',
      read: false
    },
    {
      type: 'like',
      from_user: {
        id: '2',
        username: 'jane_smith',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=jane',
        isVerified: false,
        isFollowing: true
      },
      post: {
        id: '1',
        media_url: 'https://picsum.photos/600/400',
        caption: 'Beautiful sunset at the beach'
      },
      timestamp: '2024-03-26T11:30:00',
      read: true
    },
    {
      type: 'comment',
      from_user: {
        id: '3',
        username: 'bob_johnson',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=bob',
        isVerified: false,
        isFollowing: false
      },
      post: {
        id: '2',
        media_url: 'https://picsum.photos/600/400',
        caption: 'Street art in the city'
      },
      content: 'That was amazing!',
      timestamp: '2024-03-26T11:00:00',
      read: false
    },
    {
      type: 'mention',
      from_user: {
        id: '4',
        username: 'sarah_wilson',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=sarah',
        isVerified: true,
        isFollowing: true
      },
      post: {
        id: '3',
        media_url: 'https://picsum.photos/600/400',
        caption: 'Check out this cool place!'
      },
      content: 'You should visit this place!',
      timestamp: '2024-03-26T10:30:00',
      read: true
    },
    {
      type: 'tag',
      from_user: {
        id: '5',
        username: 'mike_brown',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=mike',
        isVerified: false,
        isFollowing: false
      },
      post: {
        id: '4',
        media_url: 'https://picsum.photos/600/400',
        caption: 'Nature photography'
      },
      content: 'Tagged you in this photo',
      timestamp: '2024-03-26T10:00:00',
      read: false
    }
  ];

  constructor() {
    // Add mock notifications to store
    this.mockNotifications.forEach(notification => {
      if (this.shouldShowNotification(notification.type)) {
        this.handleNotification(notification);
      }
    });
  }

  private shouldShowNotification(type: string): boolean {
    return this.settings[type as keyof NotificationSettings];
  }

  private handleNotification(notification: NotificationPayload) {
    // Create notification object
    const newNotification = {
      id: Date.now().toString(),
      type: notification.type,
      from_user: notification.from_user,
      post: notification.post,
      timestamp: notification.timestamp,
      read: notification.read,
      content: notification.content,
    };

    // Add to store
    useNotificationsStore.getState().addNotification(newNotification);

    // Play sound if enabled
    if (this.settings.sounds) {
      this.playNotificationSound();
    }
  }

  private playNotificationSound() {
    const audio = new Audio('/sounds/notification.mp3');
    audio.play().catch(() => {});
  }

  setSettings(settings: Partial<NotificationSettings>) {
    this.settings = { ...this.settings, ...settings };
  }

  getSettings(): NotificationSettings {
    return this.settings;
  }

  getNotifications(): NotificationPayload[] {
    return this.mockNotifications;
  }

  addNotification(notification: NotificationPayload) {
    this.mockNotifications.unshift(notification);
  }

  markAsRead(id: string) {
    const notification = this.mockNotifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  }

  markAllAsRead() {
    this.mockNotifications.forEach(n => {
      n.read = true;
    });
  }

  toggleFollow(userId: string) {
    this.mockNotifications.forEach(n => {
      if (n.from_user.id === userId) {
        n.from_user.isFollowing = !n.from_user.isFollowing;
      }
    });
  }
}

export const notificationService = new NotificationService();
