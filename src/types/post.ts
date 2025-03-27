export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url: string;
  created_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  caption: string;
  media_url: string;
  media_type: 'image' | 'video';
  likes_count: number;
  comments_count: number;
  created_at: string;
  user: User;
  hashtags: string[];
  location?: string;
  views_count?: number;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  from_user: User;
  post_id?: string;
  post_media_url?: string;
  timestamp: string;
  read: boolean;
}

export interface Hashtag {
  id: string;
  hashtag: string;
  post_count: number;
  related_tags: string[];
}
