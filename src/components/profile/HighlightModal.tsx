import { useState } from 'react';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';

interface HighlightModalProps {
  highlight: {
    id: string;
    title: string;
    cover: string;
    type: 'text' | 'image' | 'video';
    content: {
      text?: string;
      media_url?: string;
      media_type?: 'image' | 'video';
    };
    created_at: string;
    updated_at: string;
  };
  onClose: () => void;
  onDelete: () => void;
  isOwner: boolean;
}

export const HighlightModal = ({ highlight, onClose, onDelete, isOwner }: HighlightModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
    } catch (error) {
      console.error('Error deleting highlight:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{highlight.title}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
              {isOwner && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
              )}
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden mb-4">
            <img
              src={highlight.cover}
              alt={highlight.title}
              className="w-full h-48 object-cover"
            />
            {highlight.type === 'video' && (
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 rounded-full p-1">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {highlight.type === 'text' && highlight.content?.text && (
              <div className="prose max-w-none">
                <p>{highlight.content.text}</p>
              </div>
            )}

            {highlight.type === 'image' && highlight.content?.media_url && (
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={highlight.content.media_url}
                  alt={highlight.title}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {highlight.type === 'video' && highlight.content?.media_url && (
              <div className="relative rounded-lg overflow-hidden">
                <video
                  src={highlight.content.media_url}
                  controls
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            <div className="flex justify-between text-sm text-gray-500">
              <span>
                Created: {new Date(highlight.created_at).toLocaleDateString()}
              </span>
              <span>
                Updated: {new Date(highlight.updated_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
