import express from 'express';
import http2 from 'http2';
import fs from 'fs';

// Express app (HTTP/1.1)
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Express behind HTTP/2 proxy' });
});

app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'John' }]);
});

// Start Express on different port
app.listen(3001, () => {
  console.log('Express server on http://localhost:3001');
});

// HTTP/2 proxy to Express
const http2Server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
});

http2Server.on('stream', (stream, headers) => {
  // Proxy to Express server
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: headers[':path'],
    method: headers[':method']
  };

  const proxyReq = http.request(options, (proxyRes) => {
    stream.respond({
      ':status': proxyRes.statusCode,
      'content-type': proxyRes.headers['content-type']
    });
    proxyRes.pipe(stream);
  });

  stream.pipe(proxyReq);
});

http2Server.listen(3000, () => {
  console.log('HTTP/2 proxy server on https://localhost:3000');
});