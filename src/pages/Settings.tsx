import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/mockAuthStore';
import {
  User,
  Mail,
  Lock,
  Shield,
  Bell,
  Sun,
  Moon,
  LogOut,
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Settings() {
  const { user, updateSettings, logout, theme, notifications_enabled, privacy_settings } = useAuthStore((state) => ({
    user: state.user,
    updateSettings: state.updateSettings,
    logout: state.logout,
    theme: state.theme,
    notifications_enabled: state.notifications_enabled,
    privacy_settings: state.privacy_settings,
  }));
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');
  const [notificationsEnabled, setNotificationsEnabled] = useState(notifications_enabled);
  const [privacySettings, setPrivacySettings] = useState(privacy_settings);

  const privacyOptions = [
    { value: 'public', label: 'Public' },
    { value: 'friends', label: 'Friends' },
    { value: 'only_me', label: 'Only Me' },
    { value: 'everyone', label: 'Everyone' },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
    }
  };

  const handleProfileUpdate = () => {
    updateSettings({
      theme: isDarkMode ? 'dark' : 'light',
      notifications_enabled: notificationsEnabled,
      privacy_settings: privacySettings,
    });
  };

  const handlePrivacyChange = (field: keyof typeof privacySettings) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as typeof privacySettings[field];
    setPrivacySettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  useEffect(() => {
    setNotificationsEnabled(notifications_enabled);
  }, [notifications_enabled]);

  useEffect(() => {
    setPrivacySettings(privacy_settings);
  }, [privacy_settings]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar_url}
            alt={user?.username}
            className="w-16 h-16 rounded-full object-cover border-2 border-white"
          />
          <div>
            <h2 className="text-xl font-semibold">{user?.username}</h2>
            <p className="text-gray-500">Edit your account</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Account Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Account</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-400" />
                <span>Username</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">{user?.username}</span>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-400" />
                <span>Email</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">{user?.email}</span>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-gray-400" />
                <span>Password</span>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Privacy & Security</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-400" />
                <span>Posts</span>
              </div>
              <select
                value={privacySettings.posts}
                onChange={handlePrivacyChange('posts')}
                className="px-3 py-2 border rounded-lg"
              >
                {privacyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-400" />
                <span>Stories</span>
              </div>
              <select
                value={privacySettings.stories}
                onChange={handlePrivacyChange('stories')}
                className="px-3 py-2 border rounded-lg"
              >
                {privacyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-400" />
                <span>Comments</span>
              </div>
              <select
                value={privacySettings.comments}
                onChange={handlePrivacyChange('comments')}
                className="px-3 py-2 border rounded-lg"
              >
                {privacyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-gray-400" />
                <span>Push Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Theme */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Theme</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-gray-400" />
                <span>Dark Mode</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={() => setIsDarkMode(!isDarkMode)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Save Changes */}
        <div className="flex justify-end mt-8">
          <Button onClick={handleProfileUpdate} className="mr-4">
            Save Changes
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
