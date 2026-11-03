import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';

interface TerminalProps {
  wsUrl: string;
  isDark: boolean;
}

export default function Terminal({ wsUrl, isDark }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize xterm.js
    const term = new XTerm({
      cursorBlink: true,
      fontFamily: '"SF Mono", Menlo, Monaco, "Courier New", monospace',
      fontSize: 14,
      theme: {
        background: isDark ? '#1e1e1e' : '#ffffff',
        foreground: isDark ? '#ffffff' : '#000000',
        cursor: isDark ? '#ffffff' : '#000000',
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();
    xtermRef.current = term;

    // Connect to the WebSocket backend
    const socket = new WebSocket(wsUrl);
    
    socket.onopen = () => {
      term.write('\r\n*** Connected to OpenCode Backend ***\r\n');
    };

    socket.onmessage = (event) => {
      term.write(event.data);
    };

    socket.onclose = () => {
      term.write('\r\n*** Disconnected from Backend ***\r\n');
    };

    // Send keystrokes to the server
    term.onData((data) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(data);
      }
    });

    // Handle window resize
    const handleResize = () => fitAddon.fit();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      socket.close();
      term.dispose();
    };
  }, [wsUrl, isDark]);

  return <div ref={terminalRef} className="w-full h-full" />;
}