import { useChatbot } from '../../contexts/ChatbotContext';
import { FiMessageSquare } from 'react-icons/fi';

const ChatbotButton = () => {
  const { chatbotVisible, toggleChatbot } = useChatbot();

  return (
    <button
      onClick={toggleChatbot}
      className={`fixed bottom-4 right-4 z-50 p-4 rounded-full shadow-lg transition-transform duration-300 ${
        chatbotVisible ? 'scale-100' : 'scale-0'
      }`}
    >
      <FiMessageSquare className="w-6 h-6 text-white" />
    </button>
  );
};

export default ChatbotButton;
