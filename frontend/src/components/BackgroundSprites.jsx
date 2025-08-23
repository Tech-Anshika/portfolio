import React, { useEffect, useState } from "react";

const sprites = ["/girl1.gif"]; // apne pixel ladki character images public/ folder me daalna

const BackgroundSprites = () => {
  const [positions, setPositions] = useState(
    sprites.map(() => ({
      top: Math.random() * 80 + 10 + "vh",
      left: Math.random() * 90 + 5 + "vw"
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prev) =>
        prev.map(() => ({
          top: Math.random() * 80 + 10 + "vh",
          left: Math.random() * 90 + 5 + "vw"
        }))
      );
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {sprites.map((src, i) => (
        <img
          key={i}
          src={src}
          alt="sprite"
          style={{
            position: "fixed",
            top: positions[i].top,
            left: positions[i].left,
            maxWidth: "200px",   // width control
            height: "auto",      // maintain aspect ratio
            imageRendering: "pixelated",
            zIndex: 1,
            opacity: 0.7,
            transition: "all 5s linear",
            objectFit: "contain", // no stretch
            pointerEvents: "none" // click block na kare
          }}
        />
      ))}
    </>
  );
};

export default BackgroundSprites;
