import { Post } from '@/types/post';
import { PostCard } from '../post/PostCard';
import { CreatePostModal } from '../post/CreatePostModal';

interface PostSectionProps {
  posts: Post[];
  onPostCreated: () => void;
}

export const PostSection = ({ posts, onPostCreated }: PostSectionProps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Posts</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Post
        </button>
      </div>

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPostCreated={onPostCreated}
      />
    </div>
  );
};
