import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '../components/ui/Button';

const SAMPLE_CONVERSATIONS = [
  {
    id: '1',
    user: {
      id: '2',
      username: 'janedoe',
      avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=jane',
    },
    lastMessage: {
      content: 'Hey, how are you?',
      timestamp: new Date().toISOString(),
      isRead: false,
    },
  },
  {
    id: '2',
    user: {
      id: '3',
      username: 'mikesmith',
      avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=mike',
    },
    lastMessage: {
      content: 'The project looks great!',
      timestamp: new Date().toISOString(),
      isRead: true,
    },
  },
] as const;

const SAMPLE_MESSAGES = [
  {
    id: '1',
    content: 'Hey, how are you?',
    timestamp: new Date().toISOString(),
    senderId: '2',
  },
  {
    id: '2',
    content: "I'm good, thanks! How about you?",
    timestamp: new Date().toISOString(),
    senderId: '1',
  },
  {
    id: '3',
    content: 'Just working on some new designs.',
    timestamp: new Date().toISOString(),
    senderId: '2',
  },
] as const;

export const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(SAMPLE_CONVERSATIONS[0]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // API call to send message
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Conversations List */}
      <div className="w-80 overflow-y-auto rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Messages</h2>
        <div className="space-y-2">
          {SAMPLE_CONVERSATIONS.map((conversation) => (
            <motion.button
              key={conversation.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedConversation(conversation)}
              className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors ${
                selectedConversation.id === conversation.id
                  ? 'bg-blue-50 dark:bg-blue-900/20'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <img
                src={conversation.user.avatar_url}
                alt={conversation.user.username}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {conversation.user.username}
                  </span>
                  {!conversation.lastMessage.isRead && (
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                  )}
                </div>
                <p className="truncate text-sm text-gray-500">
                  {conversation.lastMessage.content}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-800">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="border-b border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <img
                  src={selectedConversation.user.avatar_url}
                  alt={selectedConversation.user.username}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="font-medium text-gray-900 dark:text-white">
                  {selectedConversation.user.username}
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {SAMPLE_MESSAGES.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === '1' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.senderId === '1'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                      }`}
                    >
                      {message.content}
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
                <Button type="submit" disabled={!newMessage.trim()}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
};