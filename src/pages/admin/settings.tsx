import AdminLayout from '../../components/admin/AdminLayout';
import { FiSettings, FiLock, FiMail, FiMapPin } from 'react-icons/fi';

const SettingsManagement = () => {
  const settings = [
    {
      title: 'General Settings',
      icon: <FiSettings className="w-6 h-6" />,
      options: [
        {
          name: 'Site Title',
          value: 'Social Media Platform',
          type: 'text',
        },
        {
          name: 'Site Description',
          value: 'Welcome to our social media platform',
          type: 'textarea',
        },
      ],
    },
    {
      title: 'Security Settings',
      icon: <FiLock className="w-6 h-6" />,
      options: [
        {
          name: 'Password Requirements',
          value: 'Minimum 8 characters',
          type: 'text',
        },
        {
          name: 'Two-Factor Authentication',
          value: 'Enabled',
          type: 'toggle',
        },
      ],
    },
    {
      title: 'Email Settings',
      icon: <FiMail className="w-6 h-6" />,
      options: [
        {
          name: 'SMTP Server',
          value: 'smtp.example.com',
          type: 'text',
        },
        {
          name: 'SMTP Port',
          value: '587',
          type: 'number',
        },
      ],
    },
    {
      title: 'Location Settings',
      icon: <FiMapPin className="w-6 h-6" />,
      options: [
        {
          name: 'Default Location',
          value: 'Global',
          type: 'select',
        },
        {
          name: 'Timezone',
          value: 'UTC',
          type: 'select',
        },
      ],
    },
  ];

  const handleSettingChange = (section: string, option: string, value: string) => {
    // Implement setting change logic
    console.log(`Updating ${section} - ${option} to ${value}`);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settings.map((section) => (
          <div
            key={section.title}
            className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                {section.icon}
              </div>
              <h3 className="ml-4 text-lg font-semibold">{section.title}</h3>
            </div>
            <div className="p-6">
              {section.options.map((option) => (
                <div key={option.name} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {option.name}
                  </label>
                  {option.type === 'text' && (
                    <input
                      type="text"
                      value={option.value}
                      onChange={(e) => handleSettingChange(section.title, option.name, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500"
                    />
                  )}
                  {option.type === 'textarea' && (
                    <textarea
                      value={option.value}
                      onChange={(e) => handleSettingChange(section.title, option.name, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500"
                    />
                  )}
                  {option.type === 'select' && (
                    <select
                      value={option.value}
                      onChange={(e) => handleSettingChange(section.title, option.name, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500"
                    >
                      <option value="default">Default</option>
                      <option value="custom">Custom</option>
                    </select>
                  )}
                  {option.type === 'toggle' && (
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        type="checkbox"
                        checked={option.value === 'Enabled'}
                        onChange={(e) => handleSettingChange(section.title, option.name, e.target.checked ? 'Enabled' : 'Disabled')}
                        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      />
                      <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default SettingsManagement;
