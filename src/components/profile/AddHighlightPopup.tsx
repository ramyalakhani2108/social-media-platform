import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus } from 'lucide-react';
import { Highlight } from '@/types';

interface AddHighlightPopupProps {
  onClose: () => void;
  onAdd: (highlight: {
    title: string;
    cover: string;
    type: 'text' | 'image' | 'video';
    content: {
      text?: string;
      media_url?: string;
      media_type?: 'image' | 'video';
    };
  }) => void;
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formData?: {
    title: string;
    cover: string;
    type: 'text' | 'image' | 'video';
    textContent?: string;
    mediaType?: 'image' | 'video';
  };
  setFormData?: (data: {
    title: string;
    cover: string;
    type: 'text' | 'image' | 'video';
    textContent?: string;
    mediaType?: 'image' | 'video';
  }) => void;
  isUploading?: boolean;
  uploadProgress?: number;
}

export const AddHighlightPopup = ({ 
  onClose, 
  onAdd, 
  onFileChange,
  formData,
  setFormData,
  isUploading,
  uploadProgress 
}: AddHighlightPopupProps) => {
  const [localFormData, setLocalFormData] = useState<{
    title: string;
    cover: string;
    type: 'text' | 'image' | 'video';
    textContent?: string;
    mediaFile?: File;
    mediaType?: 'image' | 'video';
  }>({
    title: formData?.title || '',
    cover: formData?.cover || '',
    type: formData?.type || 'image',
    textContent: formData?.textContent || '',
    mediaFile: undefined,
    mediaType: formData?.mediaType || 'image'
  });

  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => ({ ...prev, [name]: value }));
    if (setFormData) {
      setFormData({
        title: localFormData.title,
        cover: localFormData.cover,
        type: localFormData.type,
        textContent: localFormData.textContent,
        mediaType: localFormData.mediaType
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        
        // Determine media type based on file extension
        const type = file.type.startsWith('image/') ? 'image' : 'video';
        setLocalFormData((prev) => ({ ...prev, mediaFile: file, mediaType: type as 'image' | 'video' }));
        
        if (onFileChange) {
          onFileChange(e);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (localFormData.type === 'text' && !localFormData.textContent) {
      alert('Please enter text content for text highlights');
      return;
    }

    if (localFormData.type !== 'text' && !localFormData.mediaFile) {
      alert('Please upload a media file for image/video highlights');
      return;
    }

    // Create a temporary URL for the media file
    const mediaUrl = localFormData.mediaFile ? URL.createObjectURL(localFormData.mediaFile) : '';

    const highlight: Highlight = {
      id: Date.now().toString(),
      title: localFormData.title,
      cover: localFormData.cover,
      type: localFormData.type as 'text' | 'image' | 'video',
      content: {
        text: localFormData.type === 'text' ? localFormData.textContent : undefined,
        media_url: localFormData.type !== 'text' ? mediaUrl : undefined,
        media_type: localFormData.type !== 'text' ? localFormData.mediaType : undefined
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    onAdd({
      title: localFormData.title,
      cover: localFormData.cover,
      type: localFormData.type as 'text' | 'image' | 'video',
      content: {
        text: localFormData.type === 'text' ? localFormData.textContent : undefined,
        media_url: localFormData.type !== 'text' ? mediaUrl : undefined,
        media_type: localFormData.type !== 'text' ? localFormData.mediaType : undefined
      }
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-96 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Add to Highlights</h2>
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
              Title
            </label>
            <Input
              name="title"
              value={localFormData.title}
              onChange={handleChange}
              className="w-full"
              placeholder="Enter highlight title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Cover Image URL
            </label>
            <Input
              name="cover"
              value={localFormData.cover}
              onChange={handleChange}
              className="w-full"
              placeholder="Enter image URL for highlight cover"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Highlight Type
            </label>
            <select
              name="type"
              value={localFormData.type}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="text">Text</option>
            </select>
          </div>

          {localFormData.type === 'text' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Text Content
              </label>
              <textarea
                name="textContent"
                value={localFormData.textContent}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setLocalFormData((prev) => ({ ...prev, textContent: e.target.value }));
                  if (setFormData) {
                    setFormData({
                      title: localFormData.title,
                      cover: localFormData.cover,
                      type: localFormData.type,
                      textContent: e.target.value,
                      mediaType: localFormData.mediaType
                    });
                  }
                }}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your text content"
                required
              />
            </div>
          )}

          {localFormData.type !== 'text' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Upload Media
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="mediaFile"
                  disabled={isUploading}
                />
                <label
                  htmlFor="mediaFile"
                  className={`flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer ${
                    isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {localFormData.mediaFile ? 'Change File' : 'Upload File'}
                </label>
              </div>

              {previewUrl && (
                <div className="mt-2">
                  {localFormData.mediaType === 'image' ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-md"
                    />
                  ) : (
                    <video
                      src={previewUrl}
                      className="w-full h-48 object-cover rounded-md"
                      controls
                    />
                  )}
                </div>
              )}

              {isUploading && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Uploading {uploadProgress}%
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
