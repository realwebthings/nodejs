import http from 'http';

// Same router logic, HTTP/1.1 server
const routes = new Map();

function addRoute(method, path, handler) {
  routes.set(`${method}:${path}`, handler);
}

// Define routes
addRoute('GET', '/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Welcome to HTTP/1.1!');
});

addRoute('GET', '/api/users', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify([{ id: 1, name: 'John' }]));
});

// Create HTTP/1.1 server
const server = http.createServer((req, res) => {
  const key = `${req.method}:${req.url}`;
  const handler = routes.get(key);
  console.log(handler, key);
  if (handler) {
    handler(req, res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3001, () => {
  console.log('HTTP/1.1 server on http://localhost:3001');
});