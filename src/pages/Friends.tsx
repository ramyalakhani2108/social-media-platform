import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/mockAuthStore';
import { Button } from '../components/ui/Button';

interface UserCardProps {
  user: {
    id: string;
    username: string;
    avatar_url: string;
    is_following: boolean;
  };
}

function UserCard({ user }: UserCardProps) {
  const { updateFollowStatus } = useAuthStore();

  const handleFollow = async () => {
    await updateFollowStatus(user.id, !user.is_following);
  };

  return (
    <div className="flex items-center gap-4 p-4 border-b last:border-b-0">
      <img
        src={user.avatar_url}
        alt={user.username}
        className="w-12 h-12 rounded-full object-cover border-2 border-white"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{user.username}</h3>
      </div>
      <Button
        onClick={handleFollow}
        variant={user.is_following ? 'outline' : 'primary'}
        size="sm"
      >
        {user.is_following ? 'Following' : 'Follow'}
      </Button>
    </div>
  );
}

export default function Friends() {
  const { followers, following, fetchFollowers, fetchFollowing, updateFollowStatus } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>('following');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFollowers();
    fetchFollowing();
  }, []);

  const filteredUsers = activeTab === 'following'
    ? following.filter(user => 
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : followers.filter(user => 
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Friends</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant={activeTab === 'following' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('following')}
            className="flex-1"
          >
            Following
          </Button>
          <Button
            variant={activeTab === 'followers' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('followers')}
            className="flex-1"
          >
            Followers
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
