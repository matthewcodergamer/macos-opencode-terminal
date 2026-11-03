import { useState, useEffect, useRef } from 'react';

interface StreamingTextProps {
  text: string;
  onComplete?: () => void;
}

export default function StreamingText({ text, onComplete }: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayedText('');
    indexRef.current = 0;
    setIsTyping(true);

    const timer = setInterval(() => {
      if (indexRef.current < text.length) {
        // Stream in chunks to simulate token streaming
        const chunkSize = Math.floor(Math.random() * 3) + 1;
        const nextIndex = Math.min(indexRef.current + chunkSize, text.length);
        
        setDisplayedText(text.slice(0, nextIndex));
        indexRef.current = nextIndex;
      } else {
        setIsTyping(false);
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, 30); // 30ms per chunk for a smooth typing effect

    return () => clearInterval(timer);
  }, [text, onComplete]);

  return (
    <div className="font-mono text-sm text-opencode-text whitespace-pre-wrap">
      {displayedText}
      {isTyping && <span className="cursor-blink ml-1">█</span>}
    </div>
  );
}
