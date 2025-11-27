import http from 'http';

const url = 'http://jsonplaceholder.typicode.com/posts/1';

// Single request timing
const timeHttp = () => {
  const start = Date.now();
  http.get(url, (res) => {
    res.on('end', () => {
      console.log(`HTTP: ${Date.now() - start}ms`);
    });
  });
};

const timeFetch = async () => {
  const start = Date.now();
  await fetch(url);
  console.log(`Fetch: ${Date.now() - start}ms`);
};

timeHttp();
timeFetch();