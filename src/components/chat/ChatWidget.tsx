import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Chatbot } from '@/pages/Chatbot';
import { Button } from '../ui/Button';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center rounded-full bg-indigo-600 p-3 text-white hover:bg-indigo-700 transition-colors duration-200"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-96 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
            style={{
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              height: '500px',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              zIndex: 51
            }}
          >
            <Chatbot onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
