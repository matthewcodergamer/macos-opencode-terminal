import { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import MacWindow from './components/MacWindow';
import TerminalUI from './components/TerminalUI';

function App() {
  const [isDark, setIsDark] = useState(false);
  const rndRef = useRef<Rnd>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 800 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const handleClose = () => {
    rndRef.current?.updatePosition({ x: 16, y: 80 });
    rndRef.current?.updateSize({ width: dimensions.width - 32, height: 550 });
  };

  const handleMinimize = () => {
    rndRef.current?.updateSize({ width: dimensions.width - 32, height: 60 });
    rndRef.current?.updatePosition({ x: 16, y: dimensions.height - 80 });
  };

  const handleMaximize = () => {
    rndRef.current?.updateSize({ width: dimensions.width - 16, height: dimensions.height - 32 });
    rndRef.current?.updatePosition({ x: 8, y: 16 });
  };

  return (
    <div className="h-[100dvh] w-screen bg-black relative overflow-hidden flex items-center justify-center">
      <Rnd
        ref={rndRef}
        default={{
          x: 16,
          y: 80,
          width: dimensions.width - 32,
          height: 550, // Standard macOS window height
        }}
        minWidth={300}
        minHeight={100}
        bounds="parent"
        dragHandleClassName="drag-handle"
        enableResizing={true} // Drag the bottom to reveal the context!
        className="shadow-2xl rounded-xl overflow-hidden border border-gray-400/30"
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
