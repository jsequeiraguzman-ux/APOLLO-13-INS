import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function TypewriterText({ text, delay = 0, speed = 30, onComplete }: { text: string, delay?: number, speed?: number, onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      }, speed);
      
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, speed]);

  return (
    <motion.span 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-mono"
    >
      {displayedText}
      <motion.span 
        animate={{ opacity: [1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-2 h-4 bg-ins-neon ml-1 align-middle"
      />
    </motion.span>
  );
}
