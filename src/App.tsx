import { useState } from 'react';
import { Rnd } from 'react-rnd';
import MacWindow from './components/MacWindow';
import TerminalUI from './components/TerminalUI';

function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className="h-[100dvh] w-full bg-black relative overflow-hidden flex items-center justify-center">
      <Rnd
        default={{
          x: (window.innerWidth - 800) / 2, // Centered horizontally
          y: (window.innerHeight - 600) / 2, // Centered vertically
          width: 800, // Standard 80-column TUI width
          height: 600, // Standard 24-row TUI height
        }}
        minWidth={400}
        minHeight={300}
        bounds="parent"
        dragHandleClassName="drag-handle"
        className="shadow-2xl rounded-xl overflow-hidden border border-opencode-border"
      >
        <MacWindow isDark={isDark} onToggleTheme={() => setIsDark(!isDark)}>
          <TerminalUI />
        </MacWindow>
      </Rnd>
    </div>
  );
}

export default App;
