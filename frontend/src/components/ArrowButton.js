import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ArrowButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) setVisible(true);
      else setVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <div
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          background: "#082a27",
          color: "#fff",
          width: "50px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "3px solid #00ffcc",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "20px",
          boxShadow: "0px 0px 10px #00ffcc, inset 0px 0px 6px #004d40",
          fontFamily: "'Press Start 2P', cursive", // Retro font
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
      >
        <FaArrowUp />
      </div>
    )
  );
};

export default ArrowButton;
