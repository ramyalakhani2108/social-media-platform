import { create } from 'zustand';

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
}

interface PostStore {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  addPost: (post: Post) => void;
  removePost: (postId: string) => void;
  updatePost: (postId: string, updates: Partial<Post>) => void;
}

const SAMPLE_POSTS: Post[] = [
  {
    id: '1',
    userId: '1',
    caption: 'Beautiful sunset at the beach',
    media_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    media_type: 'image',
    likes_count: 120,
    comments_count: 8,
    comments: [],
    created_at: new Date().toISOString(),
    user: {
      id: '1',
      username: 'johndoe',
      avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=john',
      isVerified: true,
    },
  },
  {
    id: '2',
    userId: '2',
    caption: 'City lights',
    media_url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390',
    media_type: 'image',
    likes_count: 89,
    comments_count: 5,
    comments: [],
    created_at: new Date().toISOString(),
    user: {
      id: '2',
      username: 'janedoe',
      avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=jane',
      isVerified: false,
    },
  },
];

export const usePostStore = create<PostStore>((set) => ({
  posts: SAMPLE_POSTS,
  loading: false,
  error: null,
  fetchPosts: async () => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ posts: SAMPLE_POSTS, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch posts', loading: false });
    }
  },
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  removePost: (postId) =>
    set((state) => ({ posts: state.posts.filter((p) => p.id !== postId) })),
  updatePost: (postId, updates) =>
    set((state) => ({
      posts: state.posts.map((p) => (p.id === postId ? { ...p, ...updates } : p)),
    })),
}));
