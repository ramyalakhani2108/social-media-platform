import { useState } from 'react';
import { Settings, Pencil, Archive, Bookmark, Users, Brush, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';

interface SettingsMenuItem {
  id: string;
  title: string;
  icon: string;
  action: () => void;
}

interface SettingsMenuProps {
  onClose: () => void;
  menuItems: SettingsMenuItem[];
}

export const SettingsMenu = ({ onClose, menuItems }: SettingsMenuProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleAction = (action: () => void) => {
    action();
    onClose();
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: JSX.Element } = {
      pencil: <Pencil className="w-4 h-4 mr-2" />,
      cog: <Settings className="w-4 h-4 mr-2" />,
      archive: <Archive className="w-4 h-4 mr-2" />,
      bookmark: <Bookmark className="w-4 h-4 mr-2" />,
      users: <Users className="w-4 h-4 mr-2" />,
      brush: <Brush className="w-4 h-4 mr-2" />,
      logout: <LogOut className="w-4 h-4 mr-2" />
    };
    return icons[iconName] || null;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
      <div className="absolute top-0 right-0 w-80 h-full bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Settings</h2>
            <button
              onClick={() => {
                setIsOpen(false);
                onClose();
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleAction(item.action)}
              >
                {getIcon(item.icon)}
                {item.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
