import { create } from 'zustand';
import { Reel, User } from '@/types';
import { useAuthStore } from './mockAuthStore';

const generateId = () => Math.random().toString(36).substring(2, 9);

interface ReelState {
  reels: Reel[];
  activeReelId: string | null;
  isViewingReel: boolean;
  
  // Actions
  viewReel: (reelId: string) => void;
  closeReelViewer: () => void;
  addReel: (userId: string, mediaUrl: string, caption: string, duration: number, audioName?: string) => void;
  likeReel: (reelId: string) => void;
  addComment: (reelId: string, comment: string) => void;
  deleteReel: (reelId: string) => void;
  likeComment: (commentId: string) => void;
  replyToComment: (commentId: string, replyText: string) => void;
  likeReply: (replyId: string) => void;
}

// Sample reels data
const SAMPLE_REELS: Reel[] = [
  {
    id: '1',
    user_id: '1',
    media_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
    caption: '✨ Friday night vibes #dance #nightlife #tiktok #viral',
    audio_name: 'Original Sound - johndoe',
    duration: 15,
    views_count: 1245,
    likes_count: 320,
    comments_count: 42,
    created_at: new Date().toISOString(),
    user: {
      id: '1',
      email: 'john@example.com',
      username: 'johndoe',
      avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=john',
      isAdmin: false,
      isVerified: true,
      bio: 'Dancer | Creator | #viral',
      location: 'New York, NY',
      website: 'https://johndoe.com',
      created_at: new Date().toISOString(),
      posts: [],
      followers: 1234,
      following: 567,
      highlights: [],
      stats: {
        posts: 150,
        followers: 1234,
        following: 567
      }
    },
    comments: [
      {
        id: 'comment-1',
        user: {
          id: '1',
          email: 'john@example.com',
          username: 'johndoe',
          avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=john',
          isAdmin: false,
          isVerified: true,
          bio: 'Dancer | Creator | #viral',
          location: 'New York, NY',
          website: 'https://johndoe.com',
          created_at: new Date().toISOString(),
          posts: [],
          followers: 1234,
          following: 567,
          highlights: [],
          stats: {
            posts: 150,
            followers: 1234,
            following: 567
          }
        },
        text: 'Love this video! 🌟',
        created_at: new Date().toISOString(),
        likes: 10,
        liked_by_current_user: false,
        replies: [
          {
            id: 'reply-1',
            user: {
              id: '2',
              email: 'jane@example.com',
              username: 'janedoe',
              avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=jane',
              isAdmin: false,
              isVerified: false,
              bio: 'Traveler | Photographer | #oceanlove',
              location: 'Los Angeles, CA',
              website: 'https://janedoe.com',
              created_at: new Date().toISOString(),
              posts: [],
              followers: 890,
              following: 456,
              highlights: [],
              stats: {
                posts: 100,
                followers: 890,
                following: 456
              }
            },
            text: 'Agreed! Amazing content!',
            created_at: new Date().toISOString(),
            likes: 3,
            liked_by_current_user: false,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    user_id: '2',
    media_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0',
    caption: 'Ocean therapy 🌊 #beach #summer #travel #relax',
    audio_name: 'Summer Waves - janedoe',
    duration: 12,
    views_count: 876,
    likes_count: 210,
    comments_count: 18,
    created_at: new Date().toISOString(),
    user: {
      id: '2',
      email: 'jane@example.com',
      username: 'janedoe',
      avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=jane',
      isAdmin: false,
      isVerified: true,
      bio: 'Traveler | Photographer | #oceanlove',
      location: 'Los Angeles, CA',
      website: 'https://janedoe.com',
      created_at: new Date().toISOString(),
      posts: [],
      followers: 890,
      following: 456,
      highlights: [],
      stats: {
        posts: 100,
        followers: 890,
        following: 456
      }
    },
    comments: [
      {
        id: 'comment-2',
        user: {
          id: '3',
          email: 'mike@example.com',
          username: 'skaterguy',
          avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=mike',
          isAdmin: false,
          isVerified: false,
          bio: 'Skateboarder | Filmmaker | #skateculture',
          location: 'San Francisco, CA',
          website: 'https://skaterguy.com',
          created_at: new Date().toISOString(),
          posts: [],
          followers: 123,
          following: 90,
          highlights: [],
          stats: {
            posts: 50,
            followers: 123,
            following: 90
          }
        },
        text: 'Beautiful shot! 🌊',
        created_at: new Date().toISOString(),
        likes: 7,
        liked_by_current_user: false,
        replies: [],
      },
    ],
  },
  {
    id: '3',
    user_id: '3',
    media_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e',
    caption: 'Skateboarding downtown 🛹 #skate #urban #streetstyle',
    audio_name: 'Urban Beats - skaterguy',
    duration: 20,
    views_count: 1532,
    likes_count: 456,
    comments_count: 67,
    created_at: new Date().toISOString(),
    user: {
      id: '3',
      email: 'mike@example.com',
      username: 'skaterguy',
      avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=mike',
      isAdmin: false,
      isVerified: false,
      bio: 'Skateboarder | Filmmaker | #skateculture',
      location: 'San Francisco, CA',
      website: 'https://skaterguy.com',
      created_at: new Date().toISOString(),
      posts: [],
      followers: 123,
      following: 90,
      highlights: [],
      stats: {
        posts: 50,
        followers: 123,
        following: 90
      }
    },
    comments: [
      {
        id: 'comment-3',
        user: {
          id: '4',
          email: 'sarah@example.com',
          username: 'skategirl',
          avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=sarah',
          isAdmin: false,
          isVerified: false,
          bio: 'Skateboarder | Artist | #skateart',
          location: 'Chicago, IL',
          website: 'https://skategirl.com',
          created_at: new Date().toISOString(),
          posts: [],
          followers: 456,
          following: 234,
          highlights: [],
          stats: {
            posts: 75,
            followers: 456,
            following: 234
          }
        },
        text: 'Amazing skills! 💪',
        created_at: new Date().toISOString(),
        likes: 15,
        liked_by_current_user: false,
        replies: [
          {
            id: 'reply-2',
            user: {
              id: '3',
              email: 'mike@example.com',
              username: 'skaterguy',
              avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=mike',
              isAdmin: false,
              isVerified: false,
              bio: 'Skateboarder | Filmmaker | #skateculture',
              location: 'San Francisco, CA',
              website: 'https://skaterguy.com',
              created_at: new Date().toISOString(),
              posts: [],
              followers: 123,
              following: 90,
              highlights: [],
              stats: {
                posts: 50,
                followers: 123,
                following: 90
              }
            },
            text: 'Thanks! 🛹',
            created_at: new Date().toISOString(),
            likes: 4,
            liked_by_current_user: false,
          },
        ],
      },
    ],
  },
  {
    id: '4',
    user_id: '4',
    media_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    caption: 'Street dance vibes 🕺 #dance #streetdance #hiphop',
    audio_name: 'Hip Hop Groove - dancer',
    duration: 18,
    views_count: 987,
    likes_count: 345,
    comments_count: 25,
    created_at: new Date().toISOString(),
    user: {
      id: '4',
      email: 'sarah@example.com',
      username: 'dancer',
      avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=sarah',
      isAdmin: false,
      isVerified: true,
      bio: 'Dancer | Choreographer | #streetdance',
      location: 'Chicago, IL',
      website: 'https://dancer.com',
      created_at: new Date().toISOString(),
      posts: [],
      followers: 456,
      following: 234,
      highlights: [],
      stats: {
        posts: 75,
        followers: 456,
        following: 234
      }
    },
    comments: [
      {
        id: 'comment-4',
        user: {
          id: '1',
          email: 'john@example.com',
          username: 'johndoe',
          avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=john',
          isAdmin: false,
          isVerified: true,
          bio: 'Dancer | Creator | #viral',
          location: 'New York, NY',
          website: 'https://johndoe.com',
          created_at: new Date().toISOString(),
          posts: [],
          followers: 1234,
          following: 567,
          highlights: [],
          stats: {
            posts: 150,
            followers: 1234,
            following: 567
          }
        },
        text: 'Incredible moves! 🕺',
        created_at: new Date().toISOString(),
        likes: 12,
        liked_by_current_user: false,
        replies: [],
      },
    ],
  },
  {
    id: '5',
    user_id: '5',
    media_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1522708323569-d9fc08d83ff9',
    caption: 'Night city vibes 🌃 #nightlife #citylights #urban',
    audio_name: 'City Lights - cityexplorer',
    duration: 16,
    views_count: 1123,
    likes_count: 289,
    comments_count: 35,
    created_at: new Date().toISOString(),
    user: {
      id: '5',
      email: 'alex@example.com',
      username: 'cityexplorer',
      avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=alex',
      isAdmin: false,
      isVerified: false,
      bio: 'City Explorer | Nightlife | #urbanexploration',
      location: 'Dallas, TX',
      website: 'https://cityexplorer.com',
      created_at: new Date().toISOString(),
      posts: [],
      followers: 901,
      following: 678,
      highlights: [],
      stats: {
        posts: 120,
        followers: 901,
        following: 678
      }
    },
    comments: [
      {
        id: 'comment-5',
        user: {
          id: '2',
          email: 'jane@example.com',
          username: 'janedoe',
          avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=jane',
          isAdmin: false,
          isVerified: false,
          bio: 'Traveler | Photographer | #oceanlove',
          location: 'Los Angeles, CA',
          website: 'https://janedoe.com',
          created_at: new Date().toISOString(),
          posts: [],
          followers: 890,
          following: 456,
          highlights: [],
          stats: {
            posts: 100,
            followers: 890,
            following: 456
          }
        },
        text: 'Beautiful night shots! 🌃',
        created_at: new Date().toISOString(),
        likes: 8,
        liked_by_current_user: false,
        replies: [],
      },
    ],
  },
];

export const useReelStore = create<ReelState>((set) => ({
  reels: SAMPLE_REELS,
  activeReelId: null,
  isViewingReel: false,
  
  viewReel: (reelId) => {
    set({
      activeReelId: reelId,
      isViewingReel: true,
    });
    
    // Increment view count
    set((state) => ({
      reels: state.reels.map((reel) =>
        reel.id === reelId
          ? { ...reel, views_count: reel.views_count + 1 }
          : reel
      ),
    }));
  },
  
  closeReelViewer: () => {
    set({
      isViewingReel: false,
    });
  },
  
  addReel: (userId, mediaUrl, caption, duration, audioName) => {
    const { user } = useAuthStore.getState();
    if (!user) return;
    
    const newReel: Reel = {
      id: generateId(),
      user_id: userId,
      media_url: mediaUrl,
      thumbnail_url: mediaUrl.replace('.mp4', '.jpg'), // In a real app, this would be generated
      caption,
      audio_name: audioName || `Original Sound - ${user.username}`,
      duration,
      views_count: 0,
      likes_count: 0,
      comments_count: 0,
      created_at: new Date().toISOString(),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar_url: user.avatar_url,
        isAdmin: user.isAdmin || false,
        isVerified: user.isVerified || false,
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        created_at: new Date().toISOString(),
        posts: [],
        followers: 0,
        following: 0,
        highlights: [],
        stats: {
          posts: 0,
          followers: 0,
          following: 0
        }
      },
      comments: [],
    };
    
    set((state) => ({
      reels: [newReel, ...state.reels],
    }));
  },
  
  likeReel: (reelId) => {
    set((state) => ({
      reels: state.reels.map((reel) =>
        reel.id === reelId
          ? { ...reel, likes_count: reel.likes_count + 1 }
          : reel
      ),
    }));
  },
  
  addComment: (reelId, comment) => {
    const { user } = useAuthStore.getState();
    if (!user) return;
    
    const newComment = {
      id: Date.now().toString(),
      user,
      text: comment,
      created_at: new Date().toISOString(),
      likes: 0,
      liked_by_current_user: false,
      replies: [],
    };
    
    set((state) => ({
      reels: state.reels.map((reel) =>
        reel.id === reelId
          ? { ...reel, comments: [...reel.comments, newComment], comments_count: reel.comments_count + 1 }
          : reel
      ),
    }));
  },
  
  deleteReel: (reelId) => {
    set((state) => ({
      reels: state.reels.filter((reel) => reel.id !== reelId),
    }));
  },
  
  likeComment: (commentId) => {
    set((state) => ({
      reels: state.reels.map((reel) => {
        const comments = reel.comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              likes: comment.likes + 1,
              liked_by_current_user: true,
            };
          }
          return comment;
        });
        return {
          ...reel,
          comments,
        };
      }),
    }));
  },
  
  replyToComment: (commentId, replyText) => {
    const { user } = useAuthStore.getState();
    if (!user) return;
    
    const reply = {
      id: Date.now().toString(),
      user,
      text: replyText,
      created_at: new Date().toISOString(),
      likes: 0,
      liked_by_current_user: false,
    };
    
    set((state) => ({
      reels: state.reels.map((reel) => {
        const comments = reel.comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), reply],
            };
          }
          return comment;
        });
        return {
          ...reel,
          comments,
        };
      }),
    }));
  },
  
  likeReply: (replyId) => {
    set((state) => ({
      reels: state.reels.map((reel) => {
        const comments = reel.comments.map((comment) => {
          const replies = (comment.replies || []).map((reply) => {
            if (reply.id === replyId) {
              return {
                ...reply,
                likes: reply.likes + 1,
                liked_by_current_user: true,
              };
            }
            return reply;
          });
          return {
            ...comment,
            replies,
          };
        });
        return {
          ...reel,
          comments,
        };
      }),
    }));
  },
}));
