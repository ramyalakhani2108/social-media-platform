import { Comment } from '../types/index';

export class CommentsService {
  private mockComments: Comment[] = [
    {
      id: '1',
      postId: '1',
      userId: '1',
      content: 'Amazing photo! 📸',
      timestamp: '2024-03-26T12:00:00',
      likes_count: 0,
      user: {
        id: '1',
        username: 'john_doe',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=john',
        isVerified: true
      }
    },
    {
      id: '2',
      postId: '1',
      userId: '2',
      content: 'Love the colors! 🌈',
      timestamp: '2024-03-26T11:50:00',
      likes_count: 0,
      user: {
        id: '2',
        username: 'jane_smith',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=jane',
        isVerified: false
      }
    },
    {
      id: '3',
      postId: '1',
      userId: '3',
      content: 'Where was this taken?',
      timestamp: '2024-03-26T11:40:00',
      likes_count: 0,
      user: {
        id: '3',
        username: 'bob_johnson',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=bob',
        isVerified: false
      }
    }
  ];

  getComments(postId: string): Comment[] {
    return this.mockComments.filter(comment => comment.postId === postId);
  }

  addComment(comment: Comment): Comment {
    this.mockComments.push(comment);
    return comment;
  }

  addReply(parentCommentId: string, reply: Comment): Comment {
    const parentComment = this.mockComments.find(c => c.id === parentCommentId);
    if (parentComment) {
      if (!parentComment.replies) {
        parentComment.replies = [];
      }
      parentComment.replies.push(reply);
    }
    return reply;
  }

  deleteComment(commentId: string): void {
    const index = this.mockComments.findIndex(c => c.id === commentId);
    if (index !== -1) {
      this.mockComments.splice(index, 1);
    }
  }

  deleteReply(parentCommentId: string, replyId: string): void {
    const parentComment = this.mockComments.find(c => c.id === parentCommentId);
    if (parentComment && parentComment.replies) {
      const replyIndex = parentComment.replies.findIndex(r => r.id === replyId);
      if (replyIndex !== -1) {
        parentComment.replies.splice(replyIndex, 1);
      }
    }
  }

  toggleLike(commentId: string): void {
    const comment = this.mockComments.find(c => c.id === commentId);
    if (comment) {
      comment.likes_count = comment.likes_count ? comment.likes_count + 1 : 1;
    }
  }
}

export const commentsService = new CommentsService();
