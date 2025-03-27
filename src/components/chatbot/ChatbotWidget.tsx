import { useState } from 'react';
import { FiSend, FiX } from 'react-icons/fi';
import { useChatbot } from '../../contexts/ChatbotContext';
import CommandSuggestions from './CommandSuggestions';

type CommandType = 'stories' | 'theme' | 'layout';
type CommandConfig = {
  [K in CommandType]: {
    [key: string]: string;
  };
};

const ChatbotWidget = () => {
  const { updateLayout, isWidgetVisible, toggleWidget } = useChatbot();
  const [message, setMessage] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const commands: CommandConfig = {
    stories: {
      vertical: 'Switch stories layout to vertical',
      horizontal: 'Switch stories layout to horizontal',
    },
    theme: {
      dark: 'Switch to dark mode',
      light: 'Switch to light mode',
    },
    layout: {
      grid: 'Switch to grid layout',
      list: 'Switch to list layout',
    },
  };

  const getCommandSuggestions = (input: string) => {
    const suggestions: string[] = [];
    
    if (input === '/') {
      Object.keys(commands).forEach(command => {
        suggestions.push(`/${command}`);
      });
    } else if (input.startsWith('/')) {
      const command = input.slice(1);
      const commandParts = command.split(' ');
      const currentCommand = commandParts[0] as CommandType;
      const currentSubcommand = commandParts[1];

      if (commands[currentCommand]) {
        Object.keys(commands[currentCommand]).forEach(subcommand => {
          if (!currentSubcommand || subcommand.startsWith(currentSubcommand)) {
            suggestions.push(`/${currentCommand} ${subcommand}`);
          }
        });
      }
    }

    return suggestions;
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Process the command
    updateLayout(message);
    setMessage('');
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);
    
    if (value === '/') {
      const suggestions = getCommandSuggestions('/');
      setSuggestions(suggestions);
      setShowSuggestions(true);
    } else if (value.startsWith('/')) {
      const suggestions = getCommandSuggestions(value);
      setSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setMessage(suggestion);
    handleSendMessage();
  };

  if (!isWidgetVisible) return null;

  return (
    <div className="fixed bottom-20 right-4 z-40">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-64">
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-sm font-medium">Quick Commands</h3>
          <button
            onClick={toggleWidget}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
        <div className="p-3">
          <div className="relative">
            <input
              type="text"
              value={message}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              placeholder="Type / for commands..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleSendMessage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
            >
              <FiSend className="w-4 h-4" />
            </button>
            
            <CommandSuggestions
              suggestions={suggestions}
              isVisible={showSuggestions}
              onSelect={handleSuggestionSelect}
              position="top"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotWidget;
