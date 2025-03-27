import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Plus } from 'lucide-react';

interface NewPostPopupProps {
  onClose: () => void;
  onPost: (post: {
    caption: string;
    media_url: string;
    media_type: 'image' | 'video';
  }) => void;
}

export const NewPostPopup = ({ onClose, onPost }: NewPostPopupProps) => {
  const [formData, setFormData] = useState({
    caption: '',
    media_url: '',
    media_type: 'image' as 'image' | 'video',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPost(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-96 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">New Post</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Caption
            </label>
            <Textarea
              name="caption"
              value={formData.caption}
              onChange={handleChange}
              className="w-full"
              rows={3}
              placeholder="Write a caption..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Media URL
            </label>
            <Input
              name="media_url"
              value={formData.media_url}
              onChange={handleChange}
              className="w-full"
              placeholder="Enter image or video URL"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Media Type
            </label>
            <select
              name="media_type"
              value={formData.media_type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Share</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
