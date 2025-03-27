import { createContext, useContext, useState } from 'react';

interface LayoutSettings {
  storiesLayout: 'horizontal' | 'vertical';
  theme: 'light' | 'dark';
  postLayout: 'grid' | 'list';
}

interface ChatbotContextType {
  layoutSettings: LayoutSettings;
  updateLayout: (command: string) => void;
  isWidgetVisible: boolean;
  isFullChatVisible: boolean;
  toggleWidget: () => void;
  toggleFullChat: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const ChatbotProvider = ({ children }: { children: React.ReactNode }) => {
  const [layoutSettings, setLayoutSettings] = useState<LayoutSettings>({
    storiesLayout: 'horizontal',
    theme: 'light',
    postLayout: 'grid',
  });
  const [isWidgetVisible, setIsWidgetVisible] = useState(true);
  const [isFullChatVisible, setIsFullChatVisible] = useState(false);

  const updateLayout = (command: string) => {
    const commandLower = command.toLowerCase();
    
    if (commandLower.includes('/stories')) {
      const layout = commandLower.includes('vertical') ? 'vertical' : 'horizontal';
      setLayoutSettings(prev => ({ ...prev, storiesLayout: layout }));
    } else if (commandLower.includes('/theme')) {
      const theme = commandLower.includes('dark') ? 'dark' : 'light';
      setLayoutSettings(prev => ({ ...prev, theme }));
      document.documentElement.classList.toggle('dark', theme === 'dark');
    } else if (commandLower.includes('/layout')) {
      const layout = commandLower.includes('list') ? 'list' : 'grid';
      setLayoutSettings(prev => ({ ...prev, postLayout: layout }));
    }
  };

  const toggleWidget = () => {
    setIsWidgetVisible(prev => !prev);
  };

  const toggleFullChat = () => {
    setIsFullChatVisible(prev => !prev);
    if (!isFullChatVisible) {
      setIsWidgetVisible(false);
    }
  };

  return (
    <ChatbotContext.Provider 
      value={{ 
        layoutSettings, 
        updateLayout, 
        isWidgetVisible, 
        isFullChatVisible,
        toggleWidget,
        toggleFullChat
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};
