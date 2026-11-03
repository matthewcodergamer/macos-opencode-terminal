import { useState, useEffect } from 'react';

// Exact frames from opencode/packages/tui/src/component/spinner-frames.ts
const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export default function ThinkingSpinner() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((prev) => (prev + 1) % SPINNER_FRAMES.length);
    }, 80); // Official OpenCode TUI interval
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="text-opencode-green font-mono text-sm mr-2">
      {SPINNER_FRAMES[frame]}
    </span>
  );
}
