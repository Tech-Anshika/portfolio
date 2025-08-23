import React, { useState, useEffect } from "react";

const EasterEggs = () => {
  const [found, setFound] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === "g") {  // press 'G' to unlock
        setFound(true);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    found && (
      <div className="fixed bottom-20 right-5 bg-pink-700 text-white p-4 rounded-xl neon-button shadow-2xl z-50 animate-pulse">
        🎉 You found a hidden Easter Egg! Check out a secret project!
      </div>
    )
  );
};

export default EasterEggs;
