import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from '../components/MessageBubble';
import TypingIndicator from '../components/TypingIndicator';
import FeedbackButtons from '../components/FeedbackButtons';
import botData from '../data/botData';
import { useNavigate } from 'react-router-dom';

const SIDEBAR_BG = '#ffffff';
const SIDEBAR_ITEM_BG = '#D7C7F4';

const quickPrompts = [
  { q: 'Hi, what is the weather?', sub: 'Get immediate ai generated response' },
  { q: 'Hi, what is my location?', sub: 'Get immediate ai generated response' },
  {
    q: 'Hi, what is the temperature?',
    sub: 'Get immediate ai generated response',
  },
  { q: 'Hi, how are you?', sub: 'Get immediate ai generated response' },
];

const Chat = () => {
  const navigate = useNavigate();

  /* ---------------- STATE ---------------- */
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('currentChat');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: Date.now(),
            sender: 'bot',
            text: 'How can I help you today?',
            time: new Date().toISOString(),
          },
        ];
  });

  const [historyList, setHistoryList] = useState(() => {
    return JSON.parse(localStorage.getItem('chatHistory')) || [];
  });

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // For mobile drawer
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const chatEndRef = useRef(null);

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    localStorage.setItem('currentChat', JSON.stringify(messages));
  }, [messages]);

  const refreshHistory = () =>
    setHistoryList(JSON.parse(localStorage.getItem('chatHistory')) || []);

  /* ---------------- ACTIONS ---------------- */
  const handleNewChat = () => {
    localStorage.removeItem('currentChat');
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: 'How can I help you today?',
        time: new Date().toISOString(),
      },
    ]);
    setInput('');
  };

  const handleSaveChat = () => {
    const history = JSON.parse(localStorage.getItem('chatHistory')) || [];
    history.push(messages);
    localStorage.setItem('chatHistory', JSON.stringify(history));
    refreshHistory();
    alert('Conversation saved');
  };

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: input.trim(),
      time: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const userQuestion = input.trim();
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply =
        botData[userQuestion] || 'Sorry, Did not understand your query!';
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply,
        time: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleQuickPrompt = (prompt) => {
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: prompt,
      time: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);

    setIsTyping(true);

    setTimeout(() => {
      const reply = botData[prompt] || 'Sorry, Did not understand your query!';
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply,
        time: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const isNewChat = messages.length === 1 && messages[0].sender === 'bot';

  /* ---------------- UI ---------------- */
  return (
    <div className="flex h-screen bg-[#F9FAFA]">
      {/* ------------ MOBILE DRAWER OVERLAY ------------ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* ------------ SIDEBAR (DESKTOP) + DRAWER (MOBILE) ------------ */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-80 border-r z-30 transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0`}
        style={{ background: SIDEBAR_BG }}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between p-4 border-b h-20">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
              U
            </div>

            <a
              href="/"
              onClick={handleNewChat}
              className="text-sm font-medium underline"
            >
              New Chat
            </a>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-xl px-2"
          >
            ✕
          </button>
        </div>

        {/* HISTORY LIST */}
        <div className="p-4">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-sm font-semibold mb-3">Past Conversations</div>

            <div className="flex flex-col gap-2 max-h-[55vh] overflow-y-auto pr-2">
              {historyList.map((conv, idx) => {
                const firstUser = conv.find((m) => m.sender === 'user');
                const title = firstUser
                  ? firstUser.text.slice(0, 60)
                  : `Conversation ${idx + 1}`;

                return (
                  <div
                    key={idx}
                    className="p-3 rounded-md cursor-pointer"
                    style={{ background: SIDEBAR_ITEM_BG }}
                    onClick={() => {
                      localStorage.setItem('currentChat', JSON.stringify(conv));
                      window.location.href = '/';
                    }}
                  >
                    <div className="text-sm font-medium">{title}</div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2 mt-3">
              <a
                href="/history"
                className="flex-1 px-3 py-2 bg-gray-100 rounded text-center"
              >
                Open History Page
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* ------------ MAIN AREA ------------ */}
      <main className="flex-1 flex flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b bg-white h-20">
          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-2xl mr-2"
          >
            ☰
          </button>

          <div className="text-lg font-semibold">Bot AI</div>
          <div className="text-sm text-gray-600">You are connected</div>
        </div>

        {/* MAIN CHAT SCREEN */}
        <div className="flex-1 overflow-auto p-6">
          {isNewChat ? (
            /* ---------- NEW CHAT UI ---------- */
            <div className="flex flex-col items-center justify-center h-full gap-6">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-2xl font-semibold mb-2">
                  How can I help you today?
                </h2>

                <div className="text-gray-500 mb-4">
                  Ask anything — or try a prompt below
                </div>

                <div className="w-20 h-20 rounded-full bg-[#9785BA] flex items-center justify-center text-white text-3xl">
                  🤖
                </div>
              </div>

              {/* PROMPT CARDS */}
              <div className="w-full max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickPrompts.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickPrompt(item.q)}
                      className="text-left p-4 rounded-lg border hover:shadow-md bg-white"
                    >
                      <div className="font-medium">{item.q}</div>
                      <div className="text-xs text-gray-500 mt-2">
                        {item.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* INPUT BAR */}
              <form
                onSubmit={handleSend}
                className="w-full max-w-2xl flex gap-3 items-center mt-6"
              >
                <input
                  type="text"
                  placeholder="Message Bot AI..."
                  className="flex-1 px-4 py-2 border rounded outline-none"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#9785BA] text-white rounded"
                >
                  Ask
                </button>
                <button
                  type="button"
                  onClick={handleSaveChat}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Save
                </button>
              </form>
            </div>
          ) : (
            /* ---------- NORMAL CHAT UI ---------- */
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-2">
                {messages.map((msg) => (
                  <div key={msg.id} className="mb-3">
                    <MessageBubble
                      sender={msg.sender}
                      text={msg.text}
                      time={msg.time}
                    >
                      {msg.sender === 'bot' && (
                        <FeedbackButtons
                          onLike={() => {
                            const key = 'feedbackStore';
                            const store =
                              JSON.parse(localStorage.getItem(key)) || {};
                            store[msg.id] = 'like';
                            localStorage.setItem(key, JSON.stringify(store));
                            alert('Thanks for your feedback 👍');
                          }}
                          onDislike={() => {
                            const key = 'feedbackStore';
                            const store =
                              JSON.parse(localStorage.getItem(key)) || {};
                            store[msg.id] = 'dislike';
                            localStorage.setItem(key, JSON.stringify(store));
                            alert('Feedback noted 👎');
                          }}
                        />
                      )}
                    </MessageBubble>
                  </div>
                ))}

                {isTyping && <TypingIndicator />}

                <div ref={chatEndRef} />
              </div>

              {/* INPUT */}
              <form
                onSubmit={handleSend}
                className="p-4 border-t bg-white flex gap-3 items-center"
              >
                <input
                  type="text"
                  placeholder="Message Bot AI..."
                  className="flex-1 px-4 py-2 border rounded outline-none"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#9785BA] text-white rounded"
                >
                  Ask
                </button>
                <button
                  type="button"
                  onClick={handleSaveChat}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Save
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Chat;
