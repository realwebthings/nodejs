import http2 from 'http2';

// Simple HTTP/2 server without SSL (for development)
const server = http2.createServer();

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/plain',
    ':status': 200
  });
  
  stream.end(`HTTP/2 Response for ${headers[':path']}`);
});

server.listen(3002, () => {
  console.log('HTTP/2 server (no SSL) running on http://localhost:3002');
});

// Client for the simple server
const client = http2.connect('http://localhost:3002');

const req = client.request({
  ':path': '/test',
  ':method': 'GET'
});

req.on('data', (chunk) => {
  console.log('Response:', chunk.toString());
});

req.on('end', () => {
  client.close();
});

req.end();