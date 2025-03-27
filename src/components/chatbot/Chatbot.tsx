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

const Chatbot = () => {
  const { updateLayout, isFullChatVisible, toggleFullChat } = useChatbot();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
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

    // Add user message
    const userMessage = { text: message, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    // Process the command
    updateLayout(message);

    // Add bot response
    const botResponse = {
      text: 'Command executed successfully!',
      isUser: false,
    };
    setMessages(prev => [...prev, botResponse]);

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

  if (!isFullChatVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg h-[600px] flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Chatbot</h2>
          <button
            onClick={toggleFullChat}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.isUser
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
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
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white pr-10"
            />
            <button
              onClick={handleSendMessage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
            >
              <FiSend className="w-5 h-5" />
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

export default Chatbot;
