import React, { useEffect } from "react";

function Notification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={styles.container}>
      <p style={styles.message}>{message}</p>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#323232",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    fontSize: "14px",
  },
  message: {
    margin: 0,
  },
};

export default Notification;
