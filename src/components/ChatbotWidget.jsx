import React, { useState } from 'react';

const CHATBOT_LOGO = '../../public/chatbot-icon2.png'; // Replace with your chatbot's logo if needed

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // Sizes for normal and maximized
  const normalSize = { width: 350, height: 500 };
  const maxSize = { width: 500, height: 700 };
  const size = isMaximized ? maxSize : normalSize;

  return (
    <>
      {/* Floating Chat Icon (bottom right) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
          {/* Animated chat bubble with tail */}
          <div className="relative mb-2 max-w-xs w-fit animate-fadeIn">
            <div className="bg-white dark:bg-gray-900 text-sm font-semibold text-gray-800 dark:text-gray-100 px-4 py-2 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-right flex items-center gap-2 relative">
              <span>
                Have questions??
                <br />
                <span className="text-primary-600 dark:text-primary-400">NamastAI here</span>
              </span>
            </div>
            {/* Bubble tail */}
            <div className="absolute right-4 -bottom-2 w-4 h-4 overflow-hidden">
              <svg width="16" height="16" viewBox="0 0 16 16">
                <polygon points="0,0 16,0 8,16" fill="white" className="dark:fill-gray-900" />
                <polygon points="0,0 16,0 8,16" fill="#e5e7eb" className="dark:fill-gray-700" opacity="0.15" />
              </svg>
            </div>
          </div>
          <button
            className="group p-0 border-none bg-transparent shadow-none focus:outline-none relative"
            onClick={() => setIsOpen(true)}
            aria-label="Open Chatbot"
            style={{ boxShadow: 'none' }}
          >
            {/* Glowing animated ring */}
            <span className="absolute inset-0 rounded-full pointer-events-none animate-pulse bg-primary-400/30 blur-md" />
            <img
              src={CHATBOT_LOGO}
              alt="Chatbot Logo"
              className="w-20 h-20 md:w-20 md:h-20 sm:w-16 sm:h-16 shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-transform duration-200"
              style={{ filter: 'none', zIndex: 1 }}
            />
          </button>
        </div>
      )}

      {/* Mobile: smaller icon and bubble, repositioned for thumb reach */}
      <style>{`
        @media (max-width: 640px) {
          .chatbot-launcher {
            right: 1rem !important;
            bottom: 1rem !important;
          }
          .chatbot-launcher img {
            width: 56px !important;
            height: 56px !important;
          }
          .chatbot-launcher .chat-bubble {
            font-size: 0.95rem !important;
            padding: 0.5rem 1rem !important;
            border-radius: 1.25rem !important;
          }
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: none;} }
        .animate-fadeIn { animation: fadeIn 0.5s cubic-bezier(.4,2,.6,1) both; }
      `}</style>

      {/* Chatbot iframe popup (bottom right) */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 bg-white border border-gray-300 rounded-xl shadow-xl z-50 overflow-hidden flex flex-col"
          style={{ width: size.width, height: size.height }}
        >
          {/* Header with logo, maximize, and close */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <img src={CHATBOT_LOGO} alt="Chatbot Logo" className="w-7 h-7 rounded" />
              <span className="font-semibold text-primary-700 text-base">NamastAI</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="text-gray-500 hover:text-primary-600 text-lg px-1"
                onClick={() => setIsMaximized((v) => !v)}
                aria-label={isMaximized ? 'Restore' : 'Maximize'}
              >
                {isMaximized ? (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" /></svg>
                ) : (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" /></svg>
                )}
              </button>
              <button
                className="text-gray-500 hover:text-red-500 text-xl font-bold px-1"
                onClick={() => setIsOpen(false)}
                aria-label="Close Chatbot"
              >
                ×
              </button>
            </div>
          </div>
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