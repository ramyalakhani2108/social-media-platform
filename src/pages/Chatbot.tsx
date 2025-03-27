import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '@/store/mockAuthStore';
import CommandSuggestions from '@/components/chatbot/CommandSuggestions';
import { useTheme } from 'next-themes';
import { useLayoutStore } from '@/store/layoutStore';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  isTyping?: boolean;
}

interface ChatbotProps {
  onClose?: () => void;
}

type CommandType = 'stories' | 'theme' | 'layout';
type CommandConfig = {
  [K in CommandType]: {
    [key: string]: string;
  };
};

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

export const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const { user } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const { setStoriesLayout, setPostLayout } = useLayoutStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      content: 'You can ask me about:\n• How to use the app\n• Features and functionality\n• Troubleshooting\n• General questions',
      isUser: false,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCommand = (command: string) => {
    const [mainCommand, subCommand] = command.slice(1).split(' ');
    
    if (!mainCommand || !subCommand) return false;

    switch (mainCommand) {
      case 'stories':
        if (subCommand === 'vertical' || subCommand === 'horizontal') {
          setStoriesLayout(subCommand);
          setMessages((prev) => [...prev, {
            id: Date.now().toString(),
            content: `Switching stories layout to ${subCommand}`,
            isUser: false,
            timestamp: new Date().toISOString(),
          }]);
          return true;
        }
        break;
      case 'theme':
        if (subCommand === 'dark' || subCommand === 'light') {
          setTheme(subCommand);
          setMessages((prev) => [...prev, {
            id: Date.now().toString(),
            content: `Switching to ${subCommand} mode`,
            isUser: false,
            timestamp: new Date().toISOString(),
          }]);
          return true;
        }
        break;
      case 'layout':
        if (subCommand === 'grid' || subCommand === 'list') {
          setPostLayout(subCommand);
          setMessages((prev) => [...prev, {
            id: Date.now().toString(),
            content: `Switching to ${subCommand} layout`,
            isUser: false,
            timestamp: new Date().toISOString(),
          }]);
          return true;
        }
        break;
    }
    return false;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    const messageText = newMessage.trim();
    setNewMessage('');
    setIsSending(true);

    // Add user message
    setMessages((prev) => [...prev, {
      id: Date.now().toString(),
      content: messageText,
      isUser: true,
      timestamp: new Date().toISOString(),
    }]);

    // Handle commands if message starts with /
    if (messageText.startsWith('/')) {
      const isCommandHandled = handleCommand(messageText);
      if (isCommandHandled) {
        setIsSending(false);
        return;
      }
    }

    // If not a command or command not handled, process as normal message
    setIsTyping(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessages((prev) => [...prev, {
        id: Date.now().toString(),
        content: `You said: ${messageText}`,
        isUser: false,
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setIsSending(false);
      setIsTyping(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewMessage(value);
    
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
    setNewMessage(suggestion);
    handleSendMessage({} as React.FormEvent);
    setShowSuggestions(false);
  };

  if (!user) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Bot className="h-6 w-6 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Assistant</h2>
        </div>
        {onClose && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <img
                src={user?.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.username || 'default'}`}
                alt={user?.username || 'User'}
                className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-gray-800 hover:scale-105 transition-transform duration-200"
              />
              {user?.isVerified && (
                <span className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full w-3 h-3 flex items-center justify-center">
                  ✓
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.username || 'User'}
              </p>
              {user?.isVerified && (
                <span className="text-xs text-blue-600">Verified</span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-4 ${message.isUser ? 'ml-auto' : 'mr-auto'}`}
            >
              <div
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} gap-3`}
              >
                {!message.isUser && (
                  <Bot className="h-6 w-6 text-indigo-600" />
                )}
                <div
                  className={`rounded-lg p-3 ${message.isUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 ml-auto flex items-center gap-2"
            >
              <Bot className="h-6 w-6 text-indigo-600" />
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-indigo-600 animate-bounce"></div>
                <div className="h-2 w-2 rounded-full bg-indigo-600 animate-bounce delay-100"></div>
                <div className="h-2 w-2 rounded-full bg-indigo-600 animate-bounce delay-200"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="border-t border-gray-200 dark:border-gray-700 p-4"
      >
        <div className="flex items-center gap-2 relative">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              placeholder="Type / for commands..."
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={isSending}
            />
            <CommandSuggestions
              suggestions={suggestions}
              isVisible={showSuggestions}
              onSelect={handleSuggestionSelect}
              position="top"
            />
          </div>
          <Button
            type="submit"
            disabled={isSending || !newMessage.trim()}
            className="flex items-center gap-1 disabled:opacity-50"
          >
            {isSending ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
            ) : (
              <Send className="h-5 w-5" />
            )}
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};