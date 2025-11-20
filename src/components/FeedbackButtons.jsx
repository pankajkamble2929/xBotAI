import React from "react";

const FeedbackButtons = ({ onLike, onDislike }) => {
  return (
    <div className="flex gap-3 items-center mt-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onLike && onLike();
        }}
        className="px-2 py-1 rounded bg-green-100 text-green-700"
        aria-label="like"
      >
        👍
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDislike && onDislike();
        }}
        className="px-2 py-1 rounded bg-red-100 text-red-700"
        aria-label="dislike"
      >
        👎
      </button>
    </div>
  );
};

export default FeedbackButtons;
