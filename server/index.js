const { WebSocketServer } = require('ws');
const pty = require('node-pty');

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Spawn the OpenCode process in a pseudo-terminal
  const shell = pty.spawn('opencode', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 24,
    cwd: process.env.HOME,
    env: process.env
  });

  // Send terminal output to the browser
  shell.onData((data) => ws.send(data));

  // Send browser keystrokes to the terminal
  ws.on('message', (msg) => shell.write(msg));

  ws.on('close', () => {
    shell.kill();
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on port 3000');