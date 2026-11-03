import { useState } from 'react';
import CommandPalette from './CommandPalette';

export default function TerminalUI() {
  const [inputText, setInputText] = useState('');
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const logo = `
██████  ██████  ███████ ███    ██  ██████  ██████  ██████  ███████ 
██   ██ ██   ██ ██      ████   ██ ██      ██    ██ ██   ██ ██      
██   ██ ██████  █████   ██ ██  ██ ██      ██    ██ ██   ██ █████   
██   ██ ██      ██      ██  ██ ██ ██      ██    ██ ██   ██ ██      
 ██████ ██      ███████ ██   ████  ██████  ██████  ██████  ███████ `;

  return (
    <div className="flex flex-col md:flex-row h-full w-full font-mono overflow-hidden">
      
      {/* LEFT COLUMN: Main Terminal Area */}
      <div className="flex flex-col flex-1 justify-between relative bg-inherit min-h-0">
        
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          
          {/* Scaled down for mobile */}
          <pre className="text-[7px] sm:text-[10px] leading-[1.1] tracking-tighter mb-8 font-bold opacity-80 text-current">
            {logo}
          </pre>

          <div className="w-full max-w-lg flex flex-col gap-1">
            {/* Input Field */}
            <div className="flex items-center border-l-2 border-current pl-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder='Ask anything... "Fix broken tests"'
                className="bg-transparent outline-none w-full text-xs sm:text-sm placeholder:opacity-50"
              />
            </div>
            
            <div className="flex items-center text-[10px] sm:text-xs opacity-60 pl-3 mt-1">
              <span className="mr-1">■</span> Build · minimax-m2.5-free · 5.2s
            </div>
            
            <div className="flex justify-end gap-4 text-[10px] sm:text-xs opacity-50 mt-2 pr-2">
              <span>tab agents</span>
              <span 
                className="cursor-pointer hover:opacity-100"
                onClick={() => setIsCommandOpen(true)}
              >
                ctrl+p commands
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 flex justify-between items-end text-[10px] opacity-50">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[#ff9f0a]">●</span> Tip Press Ctrl+C when typing to clear the input field
          </div>
          <span>1.2.26</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Sidebar (Stacks on mobile, side-by-side on desktop) */}
      <div className="w-full md:w-[300px] border-t md:border-t-0 md:border-l border-gray-300/30 flex flex-col p-4 text-[10px] sm:text-xs gap-4 overflow-y-auto bg-[#f9f9f9]/50 md:bg-transparent">
        <div>
          <h3 className="font-bold mb-2">Mac specifications request</h3>
          <div className="flex flex-col gap-1 opacity-70">
            <span className="font-bold">Context</span>
            <span>11,764 tokens</span>
            <span>6% used</span>
            <span>$0.00 spent</span>
          </div>
        </div>

        <div className="border border-gray-300/50 rounded p-3 relative bg-white/50">
          <h4 className="font-bold mb-2 flex items-center gap-1">
            <span>◆</span> Getting started
          </h4>
          <p className="opacity-70 mb-2 leading-relaxed">
            OpenCode includes free models so you can start immediately.
          </p>
          <div className="flex justify-between items-center mt-3">
            <span className="font-bold">Connect provider</span>
            <span className="opacity-50">/connect</span>
          </div>
        </div>
      </div>

      {isCommandOpen && <CommandPalette onClose={() => setIsCommandOpen(false)} />}
    </div>
  );
}
