import http from 'http';

// Basic HTTP/1.1 server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Hello from HTTP/1.1', url: req.url }));
});

server.listen(3000, () => {
  console.log('HTTP/1.1 server running on http://localhost:3000');
});