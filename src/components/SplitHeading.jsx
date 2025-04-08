// components/SplitHeading.jsx

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplitHeading({ lines, className = "" }) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= lines[0]?.length) {
        setTypedText(lines[0].slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Speed of typing

    return () => clearInterval(interval);
  }, [lines]);

  return (
    <div className={`overflow-hidden leading-tight ${className}`}>
      {/* Line 1 - Typewriter Effect */}
      <h1 className="text-3xl font-bold whitespace-nowrap">
        {typedText}
        <span className="animate-pulse">|</span>
      </h1>

      {/* Line 2 - Fade In */}
      {typedText === lines[0] && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg mt-2 text-muted-foreground"
        >
          {lines[1]}
        </motion.p>
      )}
    </div>
  );
}
