import http from 'http';

const testUrl = 'http://jsonplaceholder.typicode.com/posts/1';
const iterations = 100;

// HTTP module benchmark
const benchmarkHttp = () => {
  return new Promise((resolve) => {
    const start = performance.now();
    let completed = 0;
    
    for (let i = 0; i < iterations; i++) {
      http.get(testUrl, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          completed++;
          if (completed === iterations) {
            const end = performance.now();
            resolve(end - start);
          }
        });
      });
    }
  });
};

// Fetch benchmark
const benchmarkFetch = async () => {
  const start = performance.now();
  
  const promises = Array(iterations).fill().map(() => 
    fetch(testUrl).then(res => res.json())
  );
  
  await Promise.all(promises);
  return performance.now() - start;
};

// Run benchmarks
const runBenchmarks = async () => {
  console.log(`Testing ${iterations} requests...\n`);
  
  const httpTime = await benchmarkHttp();
  console.log(`HTTP module: ${httpTime.toFixed(2)}ms`);
  
  const fetchTime = await benchmarkFetch();
  console.log(`Fetch API: ${fetchTime.toFixed(2)}ms`);
  
  const difference = ((fetchTime - httpTime) / httpTime * 100).toFixed(1);
  console.log(`\nDifference: ${difference}% ${fetchTime > httpTime ? 'slower' : 'faster'} for Fetch`);
};

runBenchmarks();