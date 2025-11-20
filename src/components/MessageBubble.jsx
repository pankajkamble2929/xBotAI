import React from 'react';

const MessageBubble = ({ sender = 'bot', text, time, children }) => {
  const isBot = sender === 'bot';

  return (
    <div
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} items-start`}
    >
      <div className={`${isBot ? 'mr-3' : 'ml-3'} flex-shrink-0`}>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isBot ? 'bg-gray-200' : 'bg-purple-600 text-white'
          }`}
        >
          {isBot ? '🤖' : '🙂'}
        </div>
      </div>

      <div className="max-w-[70%]">
        <div
          className={`rounded-lg px-4 py-2 ${
            isBot ? 'bg-white text-gray-900' : 'bg-[#9785BA] text-white'
          }`}
        >
          {isBot && (
            <span className="text-sm font-semibold mb-1 block">Soul AI</span>
          )}

          <p className="whitespace-pre-wrap">{text}</p>
          <div className="text-xs text-gray-500 mt-2">
            {time ? new Date(time).toLocaleTimeString() : ''}
          </div>
        </div>

        {isBot && <div className="mt-1">{children}</div>}
      </div>
    </div>
  );
};

export default MessageBubble;
