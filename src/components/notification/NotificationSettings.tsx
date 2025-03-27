import { notificationService } from '../../services/notificationService';
import { useState } from 'react';

export const NotificationSettings = () => {
  const [settings, setSettings] = useState(notificationService.getSettings());

  const handleToggle = (type: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
    notificationService.setSettings({ [type]: !settings[type] });
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Notification Settings</h2>
      
      <div className="space-y-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.likes}
            onChange={() => handleToggle('likes')}
            className="mr-2"
          />
          <span>Like notifications</span>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.comments}
            onChange={() => handleToggle('comments')}
            className="mr-2"
          />
          <span>Comment notifications</span>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.follows}
            onChange={() => handleToggle('follows')}
            className="mr-2"
          />
          <span>Follow notifications</span>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.mentions}
            onChange={() => handleToggle('mentions')}
            className="mr-2"
          />
          <span>Mention notifications</span>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={settings.sounds}
            onChange={() => handleToggle('sounds')}
            className="mr-2"
          />
          <span>Notification sounds</span>
        </div>
      </div>
    </div>
  );
};
