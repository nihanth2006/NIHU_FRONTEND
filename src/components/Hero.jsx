import React from "react";
import PromptBox from "./PromptBox";

export default function Hero() {
  return (
    <div style={styles.container}>
      {/* Main Heading */}
      <h1 style={styles.heading}>
        Build something with <span style={styles.highlight}>NIHU AI</span>
      </h1>

      {/* Subheading */}
      <p style={styles.subheading}>
        Create apps and websites by chatting with AI
      </p>

      {/* Prompt Box */}
      <div style={styles.promptWrapper}>
        <PromptBox />
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "80px",
    textAlign: "center",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 20px",
  },
  heading: {
    fontSize: "58px",
    fontWeight: "900",
    margin: 0,
    opacity: 0,
    animation: "fadeUp 3s ease-out forwards",
  },

  // 🤍 Updated to requested color #c9c0bb
  highlight: {
    color: "white",
  },

  subheading: {
    marginTop: "15px",
    fontSize: "20px",
    opacity: 0.8,
  },

  promptWrapper: {
    marginTop: "60px",
    width: "100%",
    maxWidth: "900px",
  },
};
