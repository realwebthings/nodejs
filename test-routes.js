import http2 from 'http2';

const client = http2.connect('http://localhost:3000');

// Test different routes
const testRoutes = [
  { method: 'GET', path: '/' },
  { method: 'GET', path: '/users' },
  { method: 'GET', path: '/users/123' },
  { method: 'GET', path: '/notfound' }
];

testRoutes.forEach(({ method, path }) => {
  const req = client.request({ ':method': method, ':path': path });
  
  req.on('data', (chunk) => {
    console.log(`${method} ${path}:`, chunk.toString());
  });
  
  req.end();
});

// Test POST
const postReq = client.request({ ':method': 'POST', ':path': '/users' });
postReq.write(JSON.stringify({ name: 'Alice', age: 25 }));
postReq.on('data', (chunk) => {
  console.log('POST /users:', chunk.toString());
});
postReq.end();

setTimeout(() => client.close(), 1000);