import { useState } from 'react';
import { MoreHorizontal, Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuthStore } from '@/store/mockAuthStore';

interface Highlight {
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

interface HighlightsProps {
  highlights: Highlight[];
  userId: string;
}

export const Highlights = ({ highlights, userId }: HighlightsProps) => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newHighlightTitle, setNewHighlightTitle] = useState('');
  const [showHighlight, setShowHighlight] = useState<string | null>(null);

  const handleAddHighlight = () => {
    if (!newHighlightTitle.trim()) return;
    // TODO: Implement add highlight functionality
    console.log('Adding highlight:', newHighlightTitle);
    setNewHighlightTitle('');
    setIsEditing(false);
  };

  const handleDeleteHighlight = (highlightId: string) => {
    // TODO: Implement delete highlight functionality
    console.log('Deleting highlight:', highlightId);
  };

  const handleViewHighlight = (highlightId: string) => {
    setShowHighlight(highlightId);
  };

  const handleCloseHighlight = () => {
    setShowHighlight(null);
  };

  const getHighlightContent = (highlight: Highlight) => {
    switch (highlight.type) {
      case 'image':
        return (
          <img
            src={highlight.content.media_url!}
            alt={highlight.title}
            className="w-full h-full object-cover"
          />
        );
      case 'video':
        return (
          <div className="relative w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed/${highlight.content.media_url!.split('v=')[1]}`}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        );
      case 'text':
        return (
          <div className="p-4 text-center">
            <p className="text-lg font-semibold mb-2">{highlight.title}</p>
            <p className="text-gray-700 dark:text-gray-300">{highlight.content.text}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Highlights</h2>
        {user?.id === userId && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Add Highlight
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-gray-500"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {isEditing && (
        <div className="mb-4">
          <input
            type="text"
            value={newHighlightTitle}
            onChange={(e) => setNewHighlightTitle(e.target.value)}
            placeholder="Enter highlight title"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleAddHighlight}
            >
              Add
            </Button>
          </div>
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-2">
        {highlights.map((highlight) => (
          <button
            key={highlight.id}
            onClick={() => handleViewHighlight(highlight.id)}
            className="relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer group"
          >
            {highlight.type === 'video' ? (
              <div className="flex items-center justify-center w-full h-full bg-black">
                <Play className="w-8 h-8 text-white" />
              </div>
            ) : (
              <img
                src={highlight.cover}
                alt={highlight.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-opacity duration-200"></div>
            <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-black bg-opacity-50 text-white text-sm font-medium">
              {highlight.title}
            </div>
            {user?.id === userId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteHighlight(highlight.id);
                }}
                className="absolute top-1 right-1 p-1 text-white hover:bg-gray-700 rounded-full transition-colors"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            )}
          </button>
        ))}
      </div>

      {showHighlight && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleCloseHighlight}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{highlights.find(h => h.id === showHighlight)?.title}</h3>
                <button
                  onClick={handleCloseHighlight}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
              {getHighlightContent(highlights.find(h => h.id === showHighlight)!) || (
                <div className="text-center py-8">Loading content...</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
