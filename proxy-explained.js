// PROXY EXPLANATION

// 1. CLIENT sends HTTP/2 request to proxy
// 2. PROXY forwards request to Express (HTTP/1.1)
// 3. EXPRESS sends response back to proxy
// 4. PROXY forwards response to client

// Let's break it down:

// CLIENT ---> HTTP/2 PROXY ---> EXPRESS SERVER
//   |              |                |
//   |              |                |
//   |         proxyReq.write()      |
//   |         (send request)        |
//   |              |                |
//   |              |<-- response ---|
//   |              |                |
//   |<-- response--|                |
//   |   (via pipe) |                |

// TWO PIPES ARE NEEDED:

// 1. stream.pipe(proxyReq) 
//    = Forward CLIENT REQUEST to Express
//    = Client data → Express server

// 2. proxyRes.pipe(stream)
//    = Forward EXPRESS RESPONSE back to client  
//    = Express response → Client

console.log('Proxy acts as a middleman between HTTP/2 client and HTTP/1.1 Express server');