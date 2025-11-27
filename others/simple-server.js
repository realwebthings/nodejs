import http from 'http';

// SERVER: Listens for requests and sends responses
const server = http.createServer((req, res) => {
  res.end('Hello from server!');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});