import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;
  startTyping: boolean;
  className?: string;
  onComplete?: () => void;
}

const Typewriter: React.FC<TypewriterProps> = ({ 
  text, 
  delay = 50, 
  startTyping, 
  className = '',
  onComplete
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!startTyping) {
      setDisplayText('');
      setCurrentIndex(0);
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && onComplete) {
      // Call onComplete when typing is finished
      onComplete();
    }
  }, [currentIndex, delay, text, startTyping, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {startTyping && currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

export default Typewriter;