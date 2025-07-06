import React, { useState } from 'react';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat message popup above icon */}
      {!isOpen && (
        <div className="fixed right-6 top-1/2 transform -translate-y-[calc(100%+80px)] z-50">
          <div className="bg-white text-sm font-semibold text-gray-800 px-4 py-2 rounded-lg shadow-md">
            🇮🇳 India's Calling... <span className="text-blue-600">NamastAI</span>
          </div>
        </div>
      )}

      {/* Floating Chat Icon */}
      {!isOpen && (
        <button
          className="fixed right-6 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50"
          onClick={() => setIsOpen(true)}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
            alt="Chat"
            className="w-6 h-6"
          />
        </button>
      )}

      {/* Chatbot iframe popup */}
      {isOpen && (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 w-[350px] h-[500px] bg-white border border-gray-300 rounded-xl shadow-xl z-50 overflow-hidden">
          {/* Close button */}
          <button
            className="absolute top-2 right-2 text-gray-600 text-xl font-bold z-50 hover:text-red-500"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>

          {/* Chatbase iframe */}
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/8HllUFjJU8DfGFMc7E-NW"
            title="Chatbot"
            className="w-full h-full border-none"
            allow="clipboard-write; microphone"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;