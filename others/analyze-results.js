// Your test results analysis
const results = [
  { http: 605.47, fetch: 739.00, diff: 22.1 },
  { http: 358.70, fetch: 391.88, diff: 9.2 },
  { http: 409.13, fetch: 433.15, diff: 5.9 },
  { http: 366.57, fetch: 388.38, diff: 5.9 },
  { http: 414.11, fetch: 393.28, diff: -5.0 },
  { http: 389.59, fetch: 829.64, diff: 112.9 },
  { http: 717.38, fetch: 714.25, diff: -0.4 },
  { http: 386.91, fetch: 458.10, diff: 18.4 },
  { http: 374.75, fetch: 416.21, diff: 11.1 },
  { http: 367.80, fetch: 388.87, diff: 5.7 },
  { http: 368.83, fetch: 390.64, diff: 5.9 },
  { http: 367.86, fetch: 399.33, diff: 8.6 },
  { http: 375.31, fetch: 407.77, diff: 8.6 },
  { http: 364.99, fetch: 412.02, diff: 12.9 },
  { http: 604.12, fetch: 587.02, diff: -2.8 }
];

const avgHttp = results.reduce((sum, r) => sum + r.http, 0) / results.length;
const avgFetch = results.reduce((sum, r) => sum + r.fetch, 0) / results.length;
const avgDiff = results.reduce((sum, r) => sum + r.diff, 0) / results.length;

console.log('=== PERFORMANCE ANALYSIS ===');
console.log(`Average HTTP:  ${avgHttp.toFixed(2)}ms`);
console.log(`Average Fetch: ${avgFetch.toFixed(2)}ms`);
console.log(`Average difference: ${avgDiff.toFixed(1)}%`);

const httpWins = results.filter(r => r.diff < 0).length;
console.log(`\nHTTP wins: ${results.length - httpWins}/${results.length} times`);
console.log(`Fetch wins: ${httpWins}/${results.length} times`);

console.log('\n=== KEY INSIGHTS ===');
console.log('• HTTP module is generally 5-15% faster');
console.log('• Results vary due to network conditions');
console.log('• Occasional outliers (112.9% difference)');
console.log('• Both are fast enough for most use cases');