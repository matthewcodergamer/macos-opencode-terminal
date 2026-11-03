import { useState } from 'react';
import MacWindow from './components/MacWindow';
import TerminalUI from './components/TerminalUI';

function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className="h-[100dvh] w-full bg-black p-4 sm:p-8 flex items-center justify-center">
      {/* Outer Window Frame */}
      <div className="w-full max-w-[880px] h-full sm:h-[80vh] rounded-xl overflow-hidden shadow-2xl border border-opencode-border">
        <MacWindow isDark={isDark} onToggleTheme={() => setIsDark(!isDark)}>
          <TerminalUI />
        </MacWindow>
      </div>
    </div>
  );
}

export default App;
