import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Outer Circle */}
      <div
        style={{
          position: "fixed",
          left: position.x - 20,
          top: position.y - 20,
          width: clicking ? 30 : 40,
          height: clicking ? 30 : 40,
          borderRadius: "50%",
          border: "2px solid #ff00ff",
          pointerEvents: "none",
          transition: "all 0.1s ease",
          zIndex: 9999,
        }}
      ></div>

      {/* Inner Dot */}
      <div
        style={{
          position: "fixed",
          left: position.x - 5,
          top: position.y - 5,
          width: clicking ? 8 : 10,
          height: clicking ? 8 : 10,
          borderRadius: "50%",
          backgroundColor: "#ff00ff",
          pointerEvents: "none",
          transition: "all 0.1s ease",
          zIndex: 9999,
        }}
      ></div>
    </>
  );
};

export default CustomCursor;
