import { useState } from 'react';
import { useAuthStore } from '@/store/mockAuthStore';
import { Button } from '../components/ui/Button';
import { PostCard } from '../components/post/PostCard';

export default function Saved() {
  const { user, savedPosts } = useAuthStore();
  const [activeCollection, setActiveCollection] = useState('All');
  const [showNewCollection, setShowNewCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  // Get unique collections from saved posts
  const collections = [...new Set(savedPosts.map(post => post.collection))];
  
  // Add 'All' collection at the start
  const collectionOptions = ['All', ...collections].map((collection, index) => ({
    id: index.toString(),
    name: collection,
    count: savedPosts.filter(post => post.collection === collection).length
  }));

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      // In a real app, this would create a new collection
      console.log('Creating collection:', newCollectionName);
      setShowNewCollection(false);
      setNewCollectionName('');
    }
  };

  const filteredPosts = savedPosts.filter(post => 
    activeCollection === 'All' || post.collection === activeCollection
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Saved</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowNewCollection(!showNewCollection)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            <span className="text-sm">New Collection</span>
          </button>
        </div>
      </div>

      {showNewCollection && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter collection name"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            className="px-4 py-2 border rounded-lg w-64"
          />
          <Button onClick={handleCreateCollection} size="sm">
            Create
          </Button>
        </div>
      )}

      <div className="mb-6">
        <div className="flex flex-wrap gap-4">
          {collectionOptions.map((collection) => (
            <button
              key={collection.id}
              onClick={() => setActiveCollection(collection.name)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                activeCollection === collection.name
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {collection.name} ({collection.count})
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
