import { useState, useEffect } from 'react';

export default function ThinkingSpinner() {
  const [frame, setFrame] = useState(0);
  
  // OpenCode uses a bouncing scanner sequence
  const frames = [
    '⬝⬝⬝■⬩⬩··',
    '⬝⬝■⬩⬩⬩··',
    '⬝■⬩⬩⬩⬩··',
    '■⬩⬩⬩⬩⬩··',
    '⬝■⬩⬩⬩⬩··',
    '⬝⬝■⬩⬩⬩··',
    '⬝⬝⬝■⬩⬩··',
    '⬝⬝⬝⬝■⬩··',
    '⬝⬝⬝⬝⬝■··',
    '⬝⬝⬝⬝⬝⬝■·',
    '⬝⬝⬝⬝⬝■··',
    '⬝⬝⬝⬝■⬩··',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 80); // 80ms per frame for smooth animation
    return () => clearInterval(timer);
  }, [frames.length]);

  return (
    <span className="text-opencode-dim font-mono text-sm">
      {frames[frame]}
    </span>
  );
}
