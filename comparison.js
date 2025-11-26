import http from 'http';

// HTTP MODULE - Verbose, callbacks
const httpRequest = () => {
  http.get('http://jsonplaceholder.typicode.com/posts/1', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('HTTP result:', JSON.parse(data).title);
    });
  }).on('error', err => console.error('HTTP error:', err));
};

// FETCH - Clean, promises
const fetchRequest = async () => {
  try {
    const response = await fetch('http://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    console.log('Fetch result:', data.title);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

httpRequest();
fetchRequest();