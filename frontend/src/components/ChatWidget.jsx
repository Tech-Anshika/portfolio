import React, { useState } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [log, setLog] = useState([
    { from: "bot", text: "Hi! Ask me about Anshika's work." },
  ]);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!msg.trim()) return;

    const userMsg = msg;
    setLog([...log, { from: "you", text: userMsg }]);
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setLog((prev) => [
          ...prev,
          { from: "bot", text: "Gemini API quota exceeded. Please try later." },
        ]);
      } else {
        setLog((prev) => [...prev, { from: "bot", text: data.reply }]);
      }
    } catch (err) {
      setLog((prev) => [...prev, { from: "bot", text: "Server error!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="chat-fab"
        onClick={() => setOpen(!open)}
        title="Chat"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#082a27",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
          zIndex: 1000,
        }}
      >
        <FaRobot size={22} color="#fff" />
      </div>

      {open && (
        <div
          className="chat-panel"
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "300px",
            maxHeight: "400px",
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 1000,
          }}
        >
          <div
            className="chat-header"
            style={{
              backgroundColor: "#082a27",
              color: "#fff",
              padding: "10px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Assistant
          </div>
          <div
            className="chat-body"
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              fontSize: "14px",
            }}
          >
            {log.map((m, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <b>{m.from === "you" ? "You" : "Bot"}:</b>{" "}
                <span>{m.text}</span>
              </div>
            ))}
            {loading && (
              <div style={{ marginBottom: 10 }}>
                <b>Bot:</b> <i>Typing...</i>
              </div>
            )}
          </div>
          <div
            className="chat-input"
            style={{
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #333",
              backgroundColor: "#111",
            }}
          >
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #333",
                marginRight: "5px",
                fontSize: "14px",
                backgroundColor: "#222",
                color: "#fff",
              }}
            />
            <button
              className="btn"
              onClick={send}
              title="Send"
              style={{
                backgroundColor: "#082a27",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
