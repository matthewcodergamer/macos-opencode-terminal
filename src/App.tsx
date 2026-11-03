import React, { useState } from 'react';
import MacWindow from './components/MacWindow';
import Terminal from './components/Terminal';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [wsUrl, setWsUrl] = useState('wss://YOUR_VPS_IP:3000'); // 🔥 UPDATE THIS

  return (
    <div className={`flex items-center justify-center h-screen w-screen transition-colors duration-300 ${isDark ? 'bg-neutral-900' : 'bg-gray-200'}`}>
      
      {/* macOS Window */}
      <MacWindow 
        title="opencode — opencode — Start_Secure"
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      >
        <Terminal wsUrl={wsUrl} isDark={isDark} />
      </MacWindow>

    </div>
  );
}

export default App;