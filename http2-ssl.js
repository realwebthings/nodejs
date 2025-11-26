import http2 from 'http2';
import fs from 'fs';

// HTTP/2 with SSL (requires certificates)
const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
});

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'application/json',
    ':status': 200
  });
  
  stream.end(JSON.stringify({
    message: 'HTTP/2 with SSL!',
    secure: true
  }));
});

server.listen(3001, () => {
  console.log('HTTP/2 SSL server running on https://localhost:3001');
});