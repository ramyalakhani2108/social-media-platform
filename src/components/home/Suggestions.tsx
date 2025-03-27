import { SuggestedUser } from '@/types/user';
import { Avatar } from '@/components/ui/Avatar';

interface SuggestionsProps {
  users: SuggestedUser[];
  title: string;
}

export const Suggestions = ({ users, title }: SuggestionsProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center space-x-3">
            <Avatar src={user.avatar_url} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user.username}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {user.name}
              </p>
            </div>
            <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
