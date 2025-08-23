import React, { useState, useEffect } from "react";

const ProgressLevel = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [level, setLevel] = useState(1);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    setScrollProgress(scrolled);
    setLevel(Math.floor(scrolled / 20) + 1); // every 20% scroll = new level
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-80 bg-black/40 p-2 rounded-full neon-button">
      <div className="flex justify-between mb-1 text-white font-bold">
        <span>Level {level}</span>
        <span>{Math.round(scrollProgress)}%</span>
      </div>
      <div className="w-full bg-gray-700 h-2 rounded-full">
        <div
          className="bg-purple-500 h-2 rounded-full"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressLevel;
