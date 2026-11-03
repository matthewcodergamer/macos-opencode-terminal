import { useState } from 'react';
import ThinkingSpinner from './ThinkingSpinner';
import StreamingText from './StreamingText';

export default function TerminalUI() {
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    setMessages((prev) => [...prev, inputText]);
    setInputText('');
    setIsThinking(true);
  };

  return (
    <div className="flex flex-col h-full w-full justify-between font-mono">
      
      {/* Top Session Bar */}
      <div className="flex justify-between items-center px-4 py-3 text-xs sm:text-sm">
        <span className="text-opencode-dim">New session</span>
        <button className="hover:text-opencode-blue transition-colors">+ New session</button>
      </div>

      {/* Center: Logo & Chat Stream */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto px-4 py-6">
        
        {/* Show logo only when no messages */}
        {messages.length === 0 && !isThinking && (
          <pre className="ascii-logo text-opencode-text font-bold mb-8">
{`█▀▀█ █▀▀█ █▀▀█ █▀▀▄ █▀▀▀ █▀▀█ █▀▀█ █▀▀█ 
█  █ █  █ █^^^ █  █ █    █  █ █  █ █  █ 
▀▀▀▀ █▀▀▀ ▀▀▀▀ ▀~~▀ ▀▀▀▀ ▀▀▀▀ ▀▀▀▀ ▀▀▀▀`}
          </pre>
        )}

        {/* Chat Stream */}
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-opencode-blue text-xs mb-1">You:</span>
              <div className="text-opencode-text text-sm">{msg}</div>
            </div>
          ))}

          {/* Thinking State */}
          {isThinking && (
            <div className="flex flex-col gap-2">
              <span className="text-opencode-dim text-xs">Thinking...</span>
              <ThinkingSpinner />
              {/* Simulate AI Response Streaming after 2 seconds */}
              {setTimeout(() => {
                setIsThinking(false);
                setMessages(prev => [...prev, "```ts\nconsole.log('OpenCode is ready');\n```"]);
              }, 2000) && null}
            </div>
          )}

          {/* AI Response Streaming */}
          {!isThinking && messages.length > 0 && messages[messages.length - 1].includes('```') && (
            <StreamingText 
              text={messages[messages.length - 1].replace(/```[a-z]*\n?/g, '')} 
            />
          )}
        </div>
      </div>

      {/* Bottom: Input Box & Status */}
      <div className="px-4 pb-4">
        <div className="flex items-center bg-opencode-surface border border-opencode-border rounded-md px-3 py-3 focus-within:border-opencode-blue focus-within:ring-1 focus-within:ring-opencode-blue">
          <span className="text-opencode-text cursor-blink mr-2 text-sm">█</span>
          
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder='Ask anything... "Fix a TODO in the codebase"'
            className="flex-1 bg-transparent text-opencode-text placeholder-opencode-dim outline-none text-xs sm:text-sm"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
          />
          
          <button 
            className="text-opencode-dim hover:text-opencode-text text-xs sm:text-sm ml-2"
            onClick={handleSend}
          >
            send
          </button>
        </div>

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
