import http2 from 'http2';

// HTTP/2 client
const client = http2.connect('https://localhost:3001', {
  rejectUnauthorized: false // Only for self-signed certs
});

// Multiple concurrent requests (multiplexing)
const requests = ['/api/users', '/api/posts', '/api/comments'];

requests.forEach((path, index) => {
  const req = client.request({
    ':path': path,
    ':method': 'GET'
  });
  
  let data = '';
  
  req.on('data', (chunk) => {
    data += chunk;
  });
  
  req.on('end', () => {
    console.log(`Request ${index + 1} (${path}):`, JSON.parse(data));
  });
  
  req.end();
});

// Handle server push
client.on('stream', (pushedStream, requestHeaders) => {
  console.log('Server pushed:', requestHeaders[':path']);
  
  let pushedData = '';
  pushedStream.on('data', (chunk) => {
    pushedData += chunk;
  });
  
  pushedStream.on('end', () => {
    console.log('Pushed content:', pushedData);
  });
});

// Close client after requests
setTimeout(() => {
  client.close();
}, 2000);