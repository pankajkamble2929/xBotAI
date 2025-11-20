import React from "react";

const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-2 p-2">
      <div className="bg-white px-3 py-2 rounded-lg inline-flex gap-1 items-center">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />
      </div>
      <div className="text-xs text-gray-500">Soul AI is typing...</div>
    </div>
  );
};

export default TypingIndicator;
