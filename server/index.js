const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 🔥 IMPORTANT: Change this to a strong password!
const AUTH_TOKEN = "my-super-secret-password-123"; 

// Allow your GitHub Pages frontend to connect
app.use(cors({
  origin: 'https://matthewcodergamer.github.io',
  credentials: true
}));

// Simple Authentication Middleware
app.use((req, res, next) => {
  // Allow health checks
  if (req.path === '/health') return next();

  const token = req.headers.authorization;
  if (token !== `Bearer ${AUTH_TOKEN}`) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }
  next();
});

// Health check endpoint
app.get('/health', (req, res) => res.send('Proxy is running'));

// Proxy all requests to the local OpenCode server on port 4096
app.use('/', createProxyMiddleware({
  target: 'http://127.0.0.1:4096',
  changeOrigin: true,
  ws: true, // Enable WebSockets for streaming responses
  onError: (err, req, res) => {
    console.error('Proxy Error:', err);
    res.status(500).send('OpenCode backend is unreachable. Is "opencode serve" running?');
  }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Secure Proxy running on port ${PORT}`);
  console.log(`Targeting OpenCode API at http://127.0.0.1:4096`);
});
