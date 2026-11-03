import { useState } from 'react';
import { Rnd } from 'react-rnd';
import MacWindow from './components/MacWindow';
import TerminalUI from './components/TerminalUI';

function App() {
  // Default to light theme to match the screenshots
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="h-[100dvh] w-full bg-black relative overflow-hidden flex items-center justify-center p-2 sm:p-4">
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: 1024, // Wider to fit the sidebar
          height: 600, // Standard terminal height
        }}
        minWidth={320}
        minHeight={400}
        bounds="parent"
        dragHandleClassName="drag-handle"
        className="shadow-2xl rounded-lg overflow-hidden border border-opencode-border mx-auto"
        style={{ position: 'relative' }} // Ensure it stays centered
      >
        <MacWindow isDark={isDark} onToggleTheme={() => setIsDark(!isDark)}>
          {/* Notice there are NO props here anymore */}
          <TerminalUI />
        </MacWindow>
      </Rnd>
    </div>
  );
}

export default App;
