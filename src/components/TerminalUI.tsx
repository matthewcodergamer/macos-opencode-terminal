import { useState } from 'react';
import ThinkingSpinner from './ThinkingSpinner';
import DiffView from './DiffView';

export default function TerminalUI() {
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    setMessages((prev) => [...prev, { role: 'user', text: inputText }]);
    setInputText('');
    setIsThinking(true);

    // Simulate the OpenCode agent loop
    setTimeout(() => {
      setIsThinking(false);
      setMessages((prev) => [
        ...prev, 
        { 
          role: 'assistant', 
          text: 'I have updated the registration form to include the date of birth field.',
          diff: [
            { lineNumber: 48, type: 'context', content: '<Label htmlFor="email">Email address</Label>' },
            { lineNumber: 49, type: 'context', content: '<Input' },
            { lineNumber: 50, type: 'context', content: '  id="email"' },
            { lineNumber: 51, type: 'context', content: '  type="email"' },
            { lineNumber: 52, type: 'context', content: '  required' },
            { lineNumber: 53, type: 'remove', content: '  tabIndex={2}' },
            { lineNumber: 54, type: 'add', content: '  tabIndex={3}' },
            { lineNumber: 55, type: 'add', content: '  name="email"' },
            { lineNumber: 56, type: 'context', content: '  placeholder="email@example.com"' },
            { lineNumber: 57, type: 'context', content: '/>' }
          ]
        }
      ]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full w-full justify-between font-mono bg-opencode-bg">
      {/* Top Session Bar */}
      <div className="flex justify-between items-center px-4 py-3 text-xs sm:text-sm border-b border-opencode-border">
        <span className="text-opencode-dim">New session</span>
        <button className="hover:text-opencode-blue transition-colors">+ New session</button>
      </div>

      {/* Main Chat & Diff Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {messages.length === 0 && !isThinking && (
          <div className="flex items-center justify-center h-full">
             <pre className="ascii-logo text-opencode-text font-bold">
{`█▀▀█ █▀▀█ █▀▀█ █▀▀▄ █▀▀▀ █▀▀█ █▀▀█ █▀▀█ 
█  █ █  █ █^^^ █  █ █    █  █ █  █ █  █ 
▀▀▀▀ █▀▀▀ ▀▀▀▀ ▀~~▀ ▀▀▀▀ ▀▀▀▀ ▀▀▀▀ ▀▀▀▀`}
             </pre>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className="flex flex-col gap-2">
            {msg.role === 'user' ? (
              <div className="text-opencode-blue text-sm">{msg.text}</div>
            ) : (
              <div className="text-opencode-text text-sm">
                {msg.text}
                {msg.diff && <DiffView lines={msg.diff} />}
              </div>
            )}
          </div>
        ))}

        {/* Official Thinking State */}
        {isThinking && (
          <div className="flex items-center text-opencode-dim text-sm">
            <ThinkingSpinner />
            <span>Thinking...</span>
          </div>
        )}
      </div>

      {/* Bottom Input Box */}
      <div className="px-4 pb-4">
        <div className="flex items-center bg-opencode-surface border border-opencode-border rounded-md px-3 py-3">
          <span className="text-opencode-text cursor-blink mr-2 text-sm">█</span>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder='Ask anything... "Fix a TODO in the codebase"'
            className="flex-1 bg-transparent text-opencode-text placeholder-opencode-dim outline-none text-xs sm:text-sm"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
          />
          <button onClick={handleSend} className="text-opencode-dim hover:text-opencode-text text-xs sm:text-sm ml-2">
            send
          </button>
        </div>
      </div>
    </div>
  );
}
