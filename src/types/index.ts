export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url: string;
  isAdmin: boolean;
  isVerified: boolean;
  bio?: string;
  location?: string;
  website?: string;
  created_at: string;
  posts: Post[];
  followers: number;
  following: number;
  highlights: Highlight[];
  stats?: {
    posts: number;
    followers: number;
    following: number;
  };
}

export interface Post {
  id: string;
  userId: string;
  caption: string;
  media_url: string;
  media_type: 'image' | 'video';
  likes_count: number;
  comments_count: number;
  comments: Array<{
    id: string;
    userId: string;
    content: string;
    created_at: string;
  }>;
  created_at: string;
  user: {
    id: string;
    username: string;
    avatar_url: string;
    isVerified: boolean;
  };
  saved: boolean;
  collection: string;
}

export interface Story {
  id: string;
  user_id: string;
  media_url: string;
  media_type: 'image' | 'video';
  created_at: string;
  expires_at: string;
  seen_by: string[];
  user: User;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  timestamp: string;
  parentId?: string;
  likes_count: number;
  user: {
    id: string;
    username: string;
    avatar_url: string;
    isVerified: boolean;
  };
  replies?: Comment[];
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
}

export interface Suggestion {
  id: string;
  username: string;
  avatar_url: string;
  is_following: boolean;
  mutual_followers: number;
  bio: string;
  isVerified: boolean;
}

export interface Highlight {
  id: string;
  title: string;
  cover: string;
  type: 'image' | 'text' | 'video';
  content: {
    media_url?: string;
    media_type?: 'image' | 'video';
    text?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface Reply {
  id: string;
  user: User;
  text: string;
  created_at: string;
  likes: number;
  liked_by_current_user: boolean;
}

export interface CommentReel {
  id: string;
  user: User;
  text: string;
  created_at: string;
  likes: number;
  liked_by_current_user: boolean;
  replies?: Reply[];
}

export interface Reel {
  id: string;
  user_id: string;
  media_url: string;
  thumbnail_url: string;
  caption: string;
  audio_name?: string;
  duration: number; // in seconds
  views_count: number;
  likes_count: number;
  comments_count: number;
  created_at: string;
  user: User;
  comments: CommentReel[];
}