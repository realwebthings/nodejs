// Understanding what handler contains

const routes = new Map();

// When we call addRoute, we store a FUNCTION in the Map
function addRoute(method, path, handlerFunction) {
  const key = `${method}:${path}`;
  console.log(`Storing function for key: ${key}`);
  routes.set(key, handlerFunction);
}

// This function gets stored in the Map
const homeHandler = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Home Page');
};

// Store the function
addRoute('GET', '/', homeHandler);

// Now let's see what we get back
const key = 'GET:/';
const handler = routes.get(key);

console.log('What is handler?', typeof handler); // "function"
console.log('Handler function:', handler.toString());

// When we call handler(req, res), it's like calling:
// homeHandler(req, res)

// Let's simulate it
const mockReq = { method: 'GET', url: '/' };
const mockRes = {
  writeHead: (status, headers) => console.log('Status:', status, 'Headers:', headers),
  end: (data) => console.log('Response:', data)
};

// This is what happens when we call handler(req, res)
handler(mockReq, mockRes);