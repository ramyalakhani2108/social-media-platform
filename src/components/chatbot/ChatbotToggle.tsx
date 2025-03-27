import { useChatbot } from '../../contexts/ChatbotContext';
import { FiMessageSquare } from 'react-icons/fi';

const ChatbotToggle = () => {
  const { isWidgetVisible, isFullChatVisible, toggleFullChat } = useChatbot();

  return (
    <button
      onClick={toggleFullChat}
      className={`fixed bottom-4 right-4 z-50 p-3 rounded-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 ${
        isFullChatVisible ? 'scale-0' : 'scale-100'
      }`}
    >
      <FiMessageSquare className="w-6 h-6 text-white" />
    </button>
  );
};

export default ChatbotToggle;
