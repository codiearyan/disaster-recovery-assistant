import { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

interface Message {
  text: string;
  isBot: boolean;
}

const defaultQuestions = [
  "What to do during an earthquake?",
  "How to prepare for floods?",
  "Emergency kit essentials?",
  "Evacuation procedures during disasters?",
];

export const ChatBot = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    setMessages(prev => [...prev, { text, isBot: false }]);
    setInputMessage('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_input: text }),
      });

      if (response.body) {
        const reader = response.body.getReader();
        let fullResponse = '';
        
        // Add an initial empty bot message
        setMessages(prev => [...prev, { text: '', isBot: true }]);

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.response) {
                  fullResponse += data.response + ' ';
                  // Update the last message (which is the bot's message)
                  setMessages(prev => [
                    ...prev.slice(0, -1),
                    { text: fullResponse.trim(), isBot: true }
                  ]);
                }
              } catch (e) {
                console.error('Error parsing JSON:', e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <div className={`fixed bottom-20 right-5 w-[350px] h-[500px] rounded-lg shadow-lg flex flex-col
          ${isDarkMode 
            ? 'bg-background border border-border' 
            : 'bg-background border border-border'}`}>
          {/* Header */}
          <div className={`p-4 rounded-t-lg flex justify-between items-center
            ${isDarkMode 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-primary text-primary-foreground'}`}>
            <h2 className="text-lg font-semibold">Disaster Recovery Assistant</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:opacity-75 text-xl focus:outline-none"
            >
              ✕
            </button>
          </div>
          
          {/* Messages Container */}
          <div className={`flex-1 overflow-y-auto p-4 ${isDarkMode ? 'bg-background' : 'bg-background'}`}>
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className={`font-medium text-foreground/70`}>Suggested questions:</p>
                {defaultQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200
                      ${isDarkMode 
                        ? 'bg-muted hover:bg-muted/80 text-foreground' 
                        : 'bg-muted hover:bg-muted/80 text-foreground'}`}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} mb-3`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot 
                      ? 'bg-muted text-foreground' 
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Container */}
          <div className={`p-4 border-t border-border bg-background`}>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && inputMessage.trim()) {
                    handleSendMessage(inputMessage.trim());
                  }
                }}
                placeholder="Type your message..."
                className={`flex-1 p-2 rounded-lg border border-input bg-background text-foreground
                  focus:outline-none focus:ring-2 focus:ring-ring`}
              />
              <button
                onClick={() => {
                  if (inputMessage.trim()) {
                    handleSendMessage(inputMessage.trim());
                  }
                }}
                className={`px-4 py-2 rounded-lg transition-colors duration-200
                  bg-primary text-primary-foreground hover:bg-primary/90`}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full shadow-lg transition-colors duration-200 
          flex items-center justify-center text-2xl
          bg-primary text-primary-foreground hover:bg-primary/90`}
      >
        {isOpen ? '✕' : '🤖'}
      </button>
    </div>
  );
};