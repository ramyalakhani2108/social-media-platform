import { ChatbotProvider } from '../contexts/ChatbotContext';
import Chatbot from '../components/chatbot/Chatbot';
import ChatbotWidget from '../components/chatbot/ChatbotWidget';
import ChatbotToggle from '../components/chatbot/ChatbotToggle';
import Stories from '../components/stories/Stories';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChatbotProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <h1 className="text-xl font-bold">Social Media</h1>
              <ChatbotToggle />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Stories section */}
            <div className="mb-8">
              <Stories />
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              {children}
            </div>
          </div>
        </main>

        {/* Chatbot Widget */}
        <ChatbotWidget />

        {/* Full Chatbot (when expanded) */}
        <Chatbot />
      </div>
    </ChatbotProvider>
  );
};

export default MainLayout;
