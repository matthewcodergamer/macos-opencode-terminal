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
    <div className="flex flex-row h-full w-full font-mono overflow-hidden">
      
      {/* LEFT COLUMN: Main Terminal Area */}
      <div className="flex flex-col flex-1 justify-between relative bg-inherit">
        
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          
          <pre className="text-[10px] sm:text-[12px] leading-[1.1] tracking-tighter mb-8 font-bold opacity-80 text-current">
            {logo}
          </pre>

          <div className="w-full max-w-lg flex flex-col gap-1">
            {/* Actual Input Field */}
            <div className="flex items-center border-l-2 border-current pl-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder='Ask anything... "Fix broken tests"'
                className="bg-transparent outline-none w-full text-sm placeholder:opacity-50"
              />
            </div>
            
            <div className="flex items-center text-xs opacity-60 pl-3 mt-1">
              <span className="mr-1">■</span> Build · minimax-m2.5-free · 5.2s
            </div>
            
            <div className="flex justify-end gap-4 text-xs opacity-50 mt-2 pr-2">
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

        <div className="p-4 flex justify-between items-end text-xs opacity-50">
          <div className="flex items-center gap-2">
            <span className="text-[#ff9f0a]">●</span> Tip Press Ctrl+C when typing to clear the input field
          </div>
          <span>1.2.26</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Sidebar */}
      <div className="w-[300px] border-l border-gray-300/30 flex flex-col p-4 text-xs gap-6 overflow-y-auto hidden md:flex">
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

        <div className="border border-gray-300/30 rounded p-3 mt-auto relative">
          <button className="absolute top-2 right-2 opacity-50 hover:opacity-100">×</button>
          <h4 className="font-bold mb-2 flex items-center gap-1">
            <span>◆</span> Getting started
          </h4>
          <p className="opacity-70 mb-3 leading-relaxed">
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

      {isCommandOpen && <CommandPalette onClose={() => setIsCommandOpen(false)} />}
    </div>
  );
}
