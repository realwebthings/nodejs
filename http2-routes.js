import http2 from 'http2';

const server = http2.createServer();

server.on('stream', (stream, headers) => {
  const method = headers[':method'];
  const path = headers[':path'];
  
  // Route handling
  if (method === 'GET' && path === '/') {
    stream.respond({ 'content-type': 'text/plain', ':status': 200 });
    stream.end('Home Page');
    
  } else if (method === 'GET' && path === '/users') {
    stream.respond({ 'content-type': 'application/json', ':status': 200 });
    stream.end(JSON.stringify([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]));
    
  } else if (method === 'GET' && path.startsWith('/users/')) {
    const userId = path.split('/')[2];
    stream.respond({ 'content-type': 'application/json', ':status': 200 });
    stream.end(JSON.stringify({ id: userId, name: `User ${userId}` }));
    
  } else if (method === 'POST' && path === '/users') {
    let body = '';
    stream.on('data', chunk => body += chunk);
    stream.on('end', () => {
      const user = JSON.parse(body);
      stream.respond({ 'content-type': 'application/json', ':status': 201 });
      stream.end(JSON.stringify({ id: Date.now(), ...user }));
    });
    
  } else {
    // 404 Not Found
    stream.respond({ 'content-type': 'text/plain', ':status': 404 });
    stream.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('HTTP/2 server with routes on http://localhost:3000');
});