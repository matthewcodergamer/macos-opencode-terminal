import { useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import MacWindow from './components/MacWindow';
import TerminalUI from './components/TerminalUI';

function App() {
  const [isDark, setIsDark] = useState(false);
  const rndRef = useRef<Rnd>(null);

  // Get iPhone screen dimensions
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 400;
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

  const handleClose = () => {
    // Reset to center
    rndRef.current?.updatePosition({ x: 10, y: 40 });
    rndRef.current?.updateSize({ width: screenWidth - 20, height: screenHeight - 80 });
  };

  const handleMinimize = () => {
    // Shrink to the bottom of the screen
    rndRef.current?.updateSize({ width: screenWidth - 20, height: 100 });
    rndRef.current?.updatePosition({ x: 10, y: screenHeight - 120 });
  };

  const handleMaximize = () => {
    // Fill the whole screen
    rndRef.current?.updateSize({ width: screenWidth, height: screenHeight });
    rndRef.current?.updatePosition({ x: 0, y: 0 });
  };

  return (
    <div className="h-[100dvh] w-screen bg-black relative overflow-hidden">
      <Rnd
        ref={rndRef}
        default={{
          x: 10,
          y: 40,
          width: screenWidth - 20,
          height: screenHeight - 80,
        }}
        minWidth={300}
        minHeight={100}
        bounds="parent"
        dragHandleClassName="drag-handle"
        enableResizing={true}
        className="shadow-2xl rounded-xl overflow-hidden border border-opencode-border"
      >
        <MacWindow 
          isDark={isDark} 
          onToggleTheme={() => setIsDark(!isDark)}
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
        >
          <TerminalUI />
        </MacWindow>
      </Rnd>
    </div>
  );
}

export default App;
