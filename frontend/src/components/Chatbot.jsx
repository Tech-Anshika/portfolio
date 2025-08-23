import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";

const Chatbot = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Icon */}
      <div
        className="fixed bottom-6 right-6 bg-cyan-500 p-4 rounded-full shadow-xl cursor-pointer hover:scale-110 transition"
        onClick={() => setOpen(!open)}
      >
        <FaRobot size={28} color="white" />
      </div>

      {/* Popup Chat Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-96 glass-card p-4 flex flex-col">
          <h3 className="neon-text text-lg mb-2">Ask Me Anything 🤖</h3>
          <div className="flex-1 overflow-y-auto bg-black/30 p-2 rounded">
            <p className="text-sm opacity-80">[AI replies will appear here]</p>
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            className="mt-2 p-2 rounded bg-black/40 border border-cyan-400 text-white"
          />
        </div>
      )}
    </>
  );
};

export default Chatbot;
