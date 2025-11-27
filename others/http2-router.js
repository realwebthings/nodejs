import http2 from 'http2';

// Simple router
const routes = new Map();

function addRoute(method, path, handler) {
  routes.set(`${method}:${path}`, handler);
}

function handleRequest(stream, headers) {
  const method = headers[':method'];
  const path = headers[':path'];
  const key = `${method}:${path}`;
  
  const handler = routes.get(key);
  console.log("==== checking ====", handler);
  if (handler) {
    handler(stream, headers);
  } else {
    stream.respond({ ':status': 404 });
    stream.end('Not Found');
  }
}

// Define routes
addRoute('GET', '/', (stream) => {
  stream.respond({ 'content-type': 'text/plain', ':status': 200 });
  stream.end('Welcome to HTTP/2!');
});

addRoute('GET', '/api/users', (stream) => {
  stream.respond({ 'content-type': 'application/json', ':status': 200 });
  stream.end(JSON.stringify([{ id: 1, name: 'John' }]));
});

addRoute('POST', '/api/users', (stream) => {
  let body = '';
  stream.on('data', chunk => body += chunk);
  stream.on('end', () => {
    stream.respond({ 'content-type': 'application/json', ':status': 201 });
    stream.end(JSON.stringify({ id: Date.now(), data: JSON.parse(body) }));
  });
});

// Create server with HTTP/1.1 fallback for browsers
const server = http2.createServer({ allowHTTP1: true });

// Handle HTTP/2 streams
server.on('stream', handleRequest);

// Handle HTTP/1.1 requests (for browsers)
server.on('request', (req, res) => {
  const method = req.method;
  const path = req.url;
  const key = `${method}:${path}`;
  
  const handler = routes.get(key);
  if (handler) {
    // Create a mock stream object for HTTP/1.1
    const mockStream = {
      respond: (headers) => {
        res.writeHead(headers[':status'] || 200, {
          'content-type': headers['content-type'] || 'text/plain'
        });
      },
      end: (data) => res.end(data),
      on: (event, callback) => req.on(event, callback)
    };
    handler(mockStream);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('HTTP/2 router server on http://localhost:3000');
});