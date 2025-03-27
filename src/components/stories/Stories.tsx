import { useChatbot } from '../../contexts/ChatbotContext';
import { FiChevronRight } from 'react-icons/fi';

interface Story {
  id: number;
  username: string;
  avatar: string;
  isViewed: boolean;
}

const stories: Story[] = [
  {
    id: 1,
    username: 'john_doe',
    avatar: '/avatars/1.jpg',
    isViewed: false,
  },
  {
    id: 2,
    username: 'jane_smith',
    avatar: '/avatars/2.jpg',
    isViewed: true,
  },
  // Add more stories as needed
];

const Stories = () => {
  const { layoutSettings } = useChatbot();

  const renderHorizontalLayout = () => (
    <div className="flex overflow-x-auto space-x-2 p-2">
      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center space-y-1">
          <div
            className={`relative w-16 h-16 rounded-full overflow-hidden border-2 border-white ${
              story.isViewed ? 'opacity-50' : ''
            }`}
          >
            <img
              src={story.avatar}
              alt={story.username}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400">{story.username}</span>
        </div>
      ))}
    </div>
  );

  const renderVerticalLayout = () => (
    <div className="grid grid-cols-1 gap-4 p-4">
      {stories.map((story) => (
        <div
          key={story.id}
          className={`flex items-center space-x-3 p-2 rounded-lg border border-gray-200 dark:border-gray-700 ${
            story.isViewed ? 'opacity-50' : ''
          }`}
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <img
              src={story.avatar}
              alt={story.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium truncate">{story.username}</span>
          </div>
          <FiChevronRight className="text-gray-400 w-5 h-5" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {layoutSettings.storiesLayout === 'horizontal'
        ? renderHorizontalLayout()
        : renderVerticalLayout()}
    </div>
  );
};

export default Stories;
