import React, { useState } from "react";
import { motion } from "framer-motion";

const games = [
  { name: "Memory Match", desc: "Match project cards to unlock details." },
  { name: "Code Puzzle", desc: "Solve mini coding puzzles for hints." },
  { name: "Reaction Test", desc: "Click fast to earn project insights." },
];

const MiniGames = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10">
      <h2 className="text-4xl font-bold mb-10 neon-text">Mini-Games</h2>
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
        {games.map((game) => (
          <motion.div
            key={game.name}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedGame(game.name)}
            className="p-6 bg-black/50 rounded-2xl shadow-lg cursor-pointer neon-button"
          >
            <h3 className="text-xl font-bold">{game.name}</h3>
            <p className="mt-2">{game.desc}</p>
          </motion.div>
        ))}
      </div>
      {selectedGame && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 p-6 bg-white text-black rounded-xl shadow-2xl w-full max-w-lg text-center"
        >
          <h3 className="text-2xl font-bold">{selectedGame}</h3>
          <p className="mt-2">Game coming soon! Stay tuned for interactive experience.</p>
          <button
            onClick={() => setSelectedGame(null)}
            className="mt-4 px-4 py-2 neon-button"
          >
            Close
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default MiniGames;
