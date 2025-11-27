import express from 'express';
import http from 'http';

// 1. START EXPRESS SERVER FIRST
const app = express();
app.use(express.json());

app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
});

app.get('/', (req, res) => {
  res.json({ message: 'Express server running!' });
});

// Express on port 3001
app.listen(3001, () => {
  console.log('✅ Express server running on http://localhost:3001');
});

// 2. START PROXY SERVER
const proxy = http.createServer((clientReq, clientRes) => {
  console.log(`📥 Proxy received: ${clientReq.method} ${clientReq.url}`);
  
  const proxyReq = http.request({
    hostname: 'localhost',
    port: 3001,  // Forward to Express
    path: clientReq.url,
    method: clientReq.method
  }, (proxyRes) => {
    console.log(`📤 Express responded: ${proxyRes.statusCode}`);
    
    clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(clientRes); // Express → Client
  });
  
  proxyReq.on('error', (err) => {
    console.error('❌ Proxy error:', err.message);
    clientRes.writeHead(500);
    clientRes.end('Proxy Error');
  });
  
  clientReq.pipe(proxyReq); // Client → Express
});

// Proxy on port 3002
proxy.listen(3002, () => {
  console.log('✅ Proxy server running on http://localhost:3002');
  console.log('\n🧪 Test with:');
  console.log('curl http://localhost:3002/users');
  console.log('curl http://localhost:3002/');
});