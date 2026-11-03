import { useState } from 'react';

export default function TerminalUI() {
  const [inputText, setInputText] = useState('');

  return (
    <div className="flex flex-col h-full w-full justify-between font-mono">
      
      {/* Top Session Bar */}
      <div className="flex justify-between items-center px-4 py-3 text-xs sm:text-sm">
        <span className="text-opencode-dim">New session</span>
        <button className="hover:text-opencode-blue transition-colors">+ New session</button>
      </div>

      {/* Center: Exact OpenCode TUI ASCII Logo */}
      <div className="flex-1 flex items-center justify-center overflow-hidden px-2">
        <pre className="ascii-logo text-opencode-text font-bold">
{`█▀▀█ █▀▀█ █▀▀█ █▀▀▄ █▀▀▀ █▀▀█ █▀▀█ █▀▀█ 
█  █ █  █ █^^^ █  █ █    █  █ █  █ █  █ 
▀▀▀▀ █▀▀▀ ▀▀▀▀ ▀~~▀ ▀▀▀▀ ▀▀▀▀ ▀▀▀▀ ▀▀▀▀`}
        </pre>
      </div>

      {/* Bottom: Input & Status */}
      <div className="px-4 pb-4">
        
        {/* Input Box */}
        <div className="flex items-center bg-opencode-surface border border-opencode-border rounded-md px-3 py-3 focus-within:border-opencode-blue focus-within:ring-1 focus-within:ring-opencode-blue">
          <span className="text-opencode-text cursor-blink mr-2 text-sm">█</span>
          
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='Ask anything... "Fix a TODO in the codebase"'
            className="flex-1 bg-transparent text-opencode-text placeholder-opencode-dim outline-none text-xs sm:text-sm"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
          />
          
          <button 
            className="text-opencode-dim hover:text-opencode-text text-xs sm:text-sm ml-2"
            onClick={() => setInputText('')}
          >
            send
          </button>
        </div>

        {/* Footer Status Line */}
        <div className="flex justify-between items-center mt-3 text-[10px] sm:text-xs text-opencode-dim">
          <span>~/Secure-backend</span>
          <div className="flex gap-4">
            <span><span className="text-opencode-text">shift+tab</span> agents</span>
            <span><span className="text-opencode-text">ctrl+p</span> commands</span>
          </div>
        </div>
      </div>
    </div>
  );
}
