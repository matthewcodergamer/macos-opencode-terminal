import { useState } from 'react';
import { Rnd } from 'react-rnd';
import MacWindow from './components/MacWindow';
import TerminalUI from './components/TerminalUI';

function App() {
  const [isDark, setIsDark] = useState(true);
  
  // 🔥 YOUR MAC'S LOCAL IP AND PASSWORD
  const serverUrl = "http://192.168.1.24:4096";
  const serverPassword = "YourStrongPassword123"; // Must match the Mac terminal!

  return (
    <div className="h-[100dvh] w-full bg-black relative overflow-hidden flex items-center justify-center">
      <Rnd
        default={{
          x: (window.innerWidth - 800) / 2,
          y: (window.innerHeight - 600) / 2,
          width: 800,
          height: 600,
        }}
        minWidth={400}
        minHeight={300}
        bounds="parent"
        dragHandleClassName="drag-handle"
        className="shadow-2xl rounded-xl overflow-hidden border border-opencode-border"
      >
        <MacWindow isDark={isDark} onToggleTheme={() => setIsDark(!isDark)}>
          <TerminalUI serverUrl={serverUrl} serverPassword={serverPassword} />
        </MacWindow>
      </Rnd>
    </div>
  );
}

export default App;
