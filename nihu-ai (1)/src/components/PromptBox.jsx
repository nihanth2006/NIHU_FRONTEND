import React, { useState, useEffect } from "react";
import { FiUpload, FiMic, FiPlus } from "react-icons/fi";
import "../styles.css";

export default function PromptBox() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState({ solutions: [] });
  const [loading, setLoading] = useState(false);

  // ---------------------------------------------
  // WORKING COPY FUNCTION (ChatGPT-style)
  // ---------------------------------------------
  const copyCode = async (code, e) => {
    try {
      await navigator.clipboard.writeText(code);

      const btn = e.target;
      btn.innerText = "Copied!";
      btn.classList.add("copied");

      setTimeout(() => {
        btn.innerText = "Copy";
        btn.classList.remove("copied");
      }, 1200);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const formatReply = (text) => {
    const solutions = text
      .split(/Solution\s*\d*:/i)
      .filter((s) => s.trim() !== "")
      .map((section) => {
        const clean = section.trim();
        const codeBlock = clean.match(/```[\s\S]*?```/);

        let code = "";
        let theory = clean;

        if (codeBlock) {
          code = codeBlock[0]
            .replace(/```[\s\S]*?\n?/, "")
            .replace(/```$/, "")
            .trim();

          theory = clean.split("```")[0].trim();
          theory = theory.replace(/Example[\s\S]*/i, "").trim();
        }

        return { theory, code };
      });

    return { solutions };
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setReply({ solutions: [] });

    try {
      const response = await fetch("https://nihubackend.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (data.reply) {
        setReply(formatReply(data.reply));
      } else {
        setReply({
          solutions: [{ theory: "⚠️ No reply from backend.", code: "" }],
        });
      }
    } catch (e) {
      console.error(e);
      setReply({
        solutions: [{ theory: "❌ Backend connection failed.", code: "" }],
      });
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Thinking Loader */}
      {loading && (
        <div className="mainResponseBox">
          <p style={{ fontSize: "18px", opacity: 0.8 }}>• • • Thinking…</p>
        </div>
      )}

      {/* SOLUTION SECTIONS */}
      {!loading &&
        reply.solutions.length > 0 &&
        reply.solutions.map((sol, index) => (
          <div className="mainResponseBox" key={index}>
            <h2 className="solutionHeader">Solution {index + 1}</h2>

            <div className="twoColumnContainer">
              {/* THEORY */}
              <div className="theoryBox">
                <h3 className="sectionTitle">📘 Theory</h3>
                <p style={{ whiteSpace: "pre-line" }}>{sol.theory}</p>
              </div>

              {/* CODE – only if not empty */}
              {sol.code && sol.code.trim() !== "" && (
                <div className="codeBox">
                  <h3 className="sectionTitle">💻 Code</h3>

                  {/* 🔥 COPY BUTTON HERE */}
                  <button
                    className="copyBtn"
                    onClick={(e) => copyCode(sol.code, e)}
                  >
                    Copy
                  </button>

                  <pre className="codeBlock">{sol.code}</pre>
                </div>
              )}
            </div>
          </div>
        ))}

      {/* INPUT BAR */}
      <div className="promptOuterBox">
        <FiPlus size={22} color="#ccc" />

        <input
          type="text"
          placeholder="Ask Nihu AI anything…"
          className="promptInput"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <FiUpload size={22} color="#ccc" />
        <FiMic size={22} color="#ccc" />

        <button className="sendBtn" onClick={sendMessage}>
          ↑
        </button>
      </div>
    </div>
  );
}
