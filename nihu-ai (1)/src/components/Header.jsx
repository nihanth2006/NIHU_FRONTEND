import React from "react";

export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>𝗡𝗜𝗛𝗨 𝗔𝗜</div>
    </header>
  );
}

const styles = {
  header: {
    width: "100%",
    padding: "20px 40px",
    color: "white",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "black",
    letterSpacing: "1px",
  },
};
