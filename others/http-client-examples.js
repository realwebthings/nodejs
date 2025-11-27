import http from 'http';

// GET request
http.get('http://localhost:3000/api/users', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('GET:', JSON.parse(data)));
});

// POST request
const postData = JSON.stringify({ name: 'John' });
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/users',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('POST:', data));
});

req.write(postData);
req.end();