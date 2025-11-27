import http from 'http'; // import http from 'node:http'; can also be wrriten

const app = http.createServer((req, res) => {

    const serverlogs = {
        url: req.url,
        method: req.method,
        headers: req.headers,
        statusCode: req.statusCode,
        statusMessage: req.statusMessage,
        remoteAddress: req.socket.remoteAddress,
        remotePort: req.socket.remotePort,
        localAddress: req.socket.localAddress,
        localPort: req.socket.localPort,
        bytesRead: req.socket.bytesRead
    }
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(serverlogs));
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});