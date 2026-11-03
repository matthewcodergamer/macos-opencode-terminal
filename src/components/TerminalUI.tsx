import { useState, useEffect } from 'react';
import ThinkingSpinner from './ThinkingSpinner';

interface TerminalUIProps {
  serverUrl: string;
  serverPassword: string;
}

export default function TerminalUI({ serverUrl, serverPassword }: TerminalUIProps) {
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Create the Auth header
  const authHeader = `Basic ${btoa(`opencode:${serverPassword}`)}`;

  // 1. Create a session when the app loads
  useEffect(() => {
    const createSession = async () => {
      try {
        const res = await fetch(`${serverUrl}/session`, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: "iPhone Session" })
        });
        const data = await res.json();
        setSessionId(data.id);
      } catch (err) {
        console.error("Failed to connect to Mac server. Is it running?", err);
      }
    };
    createSession();
  }, [serverUrl, authHeader]);

  // 2. Send a message to the AI
  const handleSend = async () => {
    if (!inputText.trim() || !sessionId) return;
    
    const userMsg = inputText;
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setInputText('');
    setIsThinking(true);

    try {
      const res = await fetch(`${serverUrl}/session/${sessionId}/message`, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: userMsg })
      });

      if (!res.body) throw new Error("No response body");
      
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let aiText = '';

      setMessages((prev) => [...prev, { role: 'assistant', text: '' }]);
      setIsThinking(false);

      // Read the stream from OpenCode
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        aiText += chunk;
        
        // Update the last message in real-time
        setMessages((prev) => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1] = { role: 'assistant', text: aiText };
          return newMsgs;
        });
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: 'assistant', text: "Error: Could not reach the Mac server." }]);
      setIsThinking(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full justify-between font-mono bg-opencode-bg">
      {/* Top Session Bar */}
      <div className="flex justify-between items-center px-4 py-3 text-xs sm:text-sm border-b border-opencode-border">
        <span className="text-opencode-dim">{sessionId ? `Session: ${sessionId.slice(0,8)}` : 'Connecting...'}</span>
        <button className="hover:text-opencode-blue transition-colors">+ New session</button>
      </div>

      {/* Main Chat Area */}
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
              <div className="text-opencode-text text-sm whitespace-pre-wrap">{msg.text}</div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center text-opencode-dim text-sm">
            <ThinkingSpinner />
            <span>Thinking...</span>
          </div>
        )}
      </div>

      {/* Bottom Input Box */}
      <div className="px-4 pb-4">
        <div className="flex items-center bg-opencode-surface border border-opencode-border rounded-md px-3 py-3 focus-within:border-opencode-blue">
          <span className="text-opencode-text cursor-blink mr-2 text-sm">█</span>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={sessionId ? 'Ask anything... "Fix a TODO in the codebase"' : 'Waiting for Mac connection...'}
            disabled={!sessionId}
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
