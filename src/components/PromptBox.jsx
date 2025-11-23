import React, { useState } from "react";
import { FiUpload, FiMic, FiPlus } from "react-icons/fi";

export default function PromptBox() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setReply("");

    try {
      const response = await fetch("https://nihubackend.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (data.reply) {
        setReply(data.reply);
      } else {
        setReply("⚠️ Backend didn't return a reply.");
      }
    } catch (error) {
      setReply("❌ Error connecting to backend.");
      console.error("Backend error:", error);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Chat result box */}
      {reply && (
        <div style={styles.responseBox}>
          <strong>Nihu AI:</strong>
          <p style={{ marginTop: "5px", fontSize: "18px" }}>{reply}</p>
        </div>
      )}

      {loading && (
        <div style={styles.responseBox}>
          <strong>Nihu AI:</strong> <p>• • • thinking…</p>
        </div>
      )}

      {/* Prompt input box */}
      <div style={styles.box}>
        <FiPlus size={22} color="#ccc" />

        <input
          type="text"
          placeholder="Ask Nihu AI anything…"
          style={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <FiUpload size={22} color="#ccc" />
        <FiMic size={22} color="#ccc" />

        <button style={styles.send} onClick={sendMessage}>
          ↑
        </button>
      </div>
    </div>
  );
}

const styles = {
  box: {
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(20px)",
    border: "1px solid #444",
    borderRadius: "30px",
    padding: "20px 25px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    width: "100%",
    marginTop: "30px",
  },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "white",
    fontSize: "18px",
  },
  send: {
    background: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "50%",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },
  responseBox: {
    background: "rgba(255,255,255,0.1)",
    padding: "20px",
    color: "white",
    borderRadius: "20px",
    marginBottom: "15px",
    backdropFilter: "blur(15px)",
    border: "1px solid #444",
  },
};
