import { RecentActivity } from '@/types/activity';
import { Avatar } from '@/components/ui/Avatar';

interface ActivityFeedProps {
  activities: RecentActivity[];
  title: string;
}

export const ActivityFeed = ({ activities, title }: ActivityFeedProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3">
            <Avatar src={activity.user.avatar_url} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                <span className="font-semibold">{activity.user.username}</span> {activity.action}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {activity.target}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
