import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HoverSparks = ({ children }) => {
  const [sparks, setSparks] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setSparks(true)}
      onHoverEnd={() => setSparks(false)}
      className="relative inline-block"
    >
      {children}
      <AnimatePresence>
        {sparks && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute -top-2 -left-2 w-full h-full border border-pink-400 rounded-full shadow-xl animate-ping"
          ></motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HoverSparks;
