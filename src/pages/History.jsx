import React, { useEffect, useState } from 'react';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('chatHistory')) || [];
    setHistory(saved);
  }, []);

  const openConversation = (conv) => {
    localStorage.setItem('currentChat', JSON.stringify(conv));
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen p-6 bg-[#F9FAFA]">
      <div className="max-w-4xl mx-auto">
        <div className="text-2xl font-semibold mb-4">Past Conversations</div>

        {history.length === 0 ? (
          <div className="p-4 bg-white rounded shadow">
            No saved conversations.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {history.map((conv, idx) => {
              const preview =
                conv.find((m) => m.sender === 'user')?.text ||
                `Conversation ${idx + 1}`;

              return (
                <div
                  key={idx}
                  className="p-4 bg-white rounded border cursor-pointer"
                  onClick={() => openConversation(conv)}
                >
                  <div className="font-medium">{preview}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
