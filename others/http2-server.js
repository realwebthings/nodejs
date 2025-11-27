import http2 from 'http2';
import fs from 'fs';

// HTTP/2 server (requires HTTPS)
const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
});

server.on('stream', (stream, headers) => {
  const path = headers[':path'];
  
  // Server push example
  if (path === '/') {
    stream.pushStream({ ':path': '/style.css' }, (err, pushStream) => {
      if (err) throw err;
      pushStream.respond({ 'content-type': 'text/css' });
      pushStream.end('body { color: blue; }');
    });
  }
  
  stream.respond({
    'content-type': 'application/json',
    ':status': 200
  });
  
  stream.end(JSON.stringify({ 
    message: 'Hello from HTTP/2', 
    path,
    multiplexed: true 
  }));
});

server.listen(3001, () => {
  console.log('HTTP/2 server running on https://localhost:3001');
});