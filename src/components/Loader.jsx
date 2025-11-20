import React from "react";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <style jsx>{`
        .loader-container {
          display: flex;
          justify-content: flex-start;
          padding: 10px 0;
        }

        .typing-indicator {
          display: flex;
          align-items: center;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          margin: 0 2px;
          background-color: #888;
          border-radius: 50%;
          display: inline-block;
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0% {
            transform: translateY(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-6px);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
