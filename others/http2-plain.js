import http2 from 'http2';

// HTTP/2 without SSL - works fine!
const server = http2.createServer();

server.on('stream', (stream, headers) => {
  console.log('Request:', headers[':method'], headers[':path']);
  
  stream.respond({
    'content-type': 'application/json',
    ':status': 200
  });
  
  stream.end(JSON.stringify({
    message: 'HTTP/2 without SSL!',
    path: headers[':path'],
    method: headers[':method']
  }));
});

server.listen(3000, () => {
  console.log('HTTP/2 server (no SSL) running on http://localhost:3000');
});

// Client for plain HTTP/2
const client = http2.connect('http://localhost:3000');

const req = client.request({
  ':path': '/api/test',
  ':method': 'GET'
});

req.on('data', (chunk) => {
  console.log('Response:', chunk.toString());
});

req.on('end', () => {
  client.close();
});

req.end();