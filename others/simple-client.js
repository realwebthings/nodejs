import http from 'http';

// CLIENT: Makes requests to servers
http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Server response:', data));
});