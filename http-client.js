import http from 'http';

// HTTP/1.1 client
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/data',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', JSON.parse(data));
  });
});

req.on('error', (err) => {
  console.error('Error:', err.message);
});

req.end();