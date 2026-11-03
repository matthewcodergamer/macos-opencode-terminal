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
    // Reset to the compact default size and center it
    rndRef.current?.updatePosition({ x: 8, y: 60 });
    rndRef.current?.updateSize({ width: dimensions.width - 16, height: 420 });
  };

  const handleMinimize = () => {
    rndRef.current?.updateSize({ width: dimensions.width - 16, height: 60 });
    rndRef.current?.updatePosition({ x: 8, y: dimensions.height - 80 });
  };

  const handleMaximize = () => {
    rndRef.current?.updateSize({ width: dimensions.width, height: dimensions.height });
    rndRef.current?.updatePosition({ x: 0, y: 0 });
  };

  return (
    <div className="h-[100dvh] w-screen bg-black relative overflow-hidden flex items-start justify-center">
      <Rnd
        ref={rndRef}
        default={{
          x: 8, // Closer to the left edge
          y: 60, // Slight gap at the top
          width: dimensions.width - 16, // Closer to the right edge
          height: 420, // Compact height (hides the context by default)
        }}
        minWidth={300}
        minHeight={100}
        bounds="parent"
        dragHandleClassName="drag-handle"
        enableResizing={true} // Allows you to drag the bottom down to see the context!
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
