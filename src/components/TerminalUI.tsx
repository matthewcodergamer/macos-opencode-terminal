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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputText(val);
    
    // Open commands if user types '/' and it's the first character
    if (val === '/') {
      setIsCommandOpen(true);
      setInputText(''); 
    }
  };

  return (
    <div className="flex flex-col h-full w-full font-mono overflow-y-auto text-[#1a1a1a] bg-[#fcfcfc]">
      
      {/* MAIN TERMINAL AREA */}
      <div className="flex flex-col flex-none h-[350px] justify-between relative min-w-0">
        
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          
          {/* Scaled Logo */}
          <div className="w-full flex justify-center overflow-hidden mb-6 mt-4">
            <pre 
              className="font-bold opacity-80 text-current leading-[1.1] tracking-tighter"
              style={{ fontSize: 'clamp(5px, 2vw, 12px)' }}
            >
              {logo}
            </pre>
          </div>

          <div className="w-full max-w-lg flex flex-col gap-1 px-2">
            <div className="flex items-center border-l-2 border-current pl-2">
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder='Ask anything... "Fix broken tests"'
                className="bg-transparent outline-none w-full text-[11px] sm:text-xs placeholder:opacity-50"
              />
            </div>
            
            <div className="flex items-center text-[10px] opacity-60 pl-3 mt-1">
              <span className="mr-1">■</span> Build · minimax-m2.5-free · 5.2s
            </div>
            
            <div className="flex justify-end gap-4 text-[10px] opacity-50 mt-2 pr-2">
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

        {/* Footer Tip */}
        <div className="px-4 pb-3 flex justify-between items-end text-[9px] opacity-50 min-w-0">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[#ff9f0a]">●</span> Tip Press Ctrl+C when typing to clear the input field
          </div>
          <span className="ml-2">1.2.26</span>
        </div>
      </div>

      {/* CONTEXT AREA (Hidden by default, revealed when dragging window taller) */}
      <div className="w-full border-t border-gray-300/50 flex flex-col p-4 text-[11px] gap-6 bg-[#f9f9f9]/50 flex-none">
        <div>
          <h3 className="font-bold mb-2">Mac specifications request</h3>
          <div className="flex flex-col gap-1 opacity-70">
            <span className="font-bold">Context</span>
            <span>11,764 tokens</span>
            <span>6% used</span>
            <span>$0.00 spent</span>
            
            <span className="font-bold mt-2">LSP</span>
            <span>LSPs will activate as files are read</span>
          </div>
        </div>

        <div className="border border-gray-300/50 rounded p-3 relative bg-[#fcfcfc]">
          <h4 className="font-bold mb-2 flex items-center gap-1">
            <span>◆</span> Getting started
          </h4>
          <p className="opacity-70 mb-2 leading-relaxed">
            OpenCode includes free models so you can start immediately.
          </p>
          <p className="opacity-70 mb-3 leading-relaxed">
            Connect from 75+ providers to use other models, including Claude, GPT, Gemini etc
          </p>
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold">Connect provider</span>
            <span className="opacity-50">/connect</span>
          </div>
        </div>
      </div>

      {/* The fully interactive Command Palette */}
      {isCommandOpen && <CommandPalette onClose={() => setIsCommandOpen(false)} />}
    </div>
  );
}
