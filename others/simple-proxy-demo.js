import http from 'http';

// Simple demo to understand piping

// 1. CLIENT REQUEST FLOW
console.log('=== REQUEST FLOW ===');
console.log('Client → HTTP/2 Proxy → Express Server');
console.log('stream.pipe(proxyReq) sends client data to Express');

// 2. RESPONSE FLOW  
console.log('\n=== RESPONSE FLOW ===');
console.log('Express Server → HTTP/2 Proxy → Client');
console.log('proxyRes.pipe(stream) sends Express response to client');

// Simplified version without HTTP/2
const proxy = http.createServer((clientReq, clientRes) => {
  console.log(`\n📥 Client requests: ${clientReq.method} ${clientReq.url}`);
  
  // Forward to Express server
  const proxyReq = http.request({
    hostname: 'localhost',
    port: 3001,
    path: clientReq.url,
    method: clientReq.method
  }, (proxyRes) => {
    console.log(`📤 Express responds with status: ${proxyRes.statusCode}`);
    
    // Copy headers from Express to client
    clientRes.writeHead(proxyRes.statusCode, proxyRes.headers);
    
    // PIPE 2: Express response → Client
    proxyRes.pipe(clientRes);
  });
  
  // PIPE 1: Client request → Express
  clientReq.pipe(proxyReq);
});

proxy.listen(3002, () => {
  console.log('\n🔄 Simple proxy running on http://localhost:3002');
  console.log('Try: curl http://localhost:3002/users');
});