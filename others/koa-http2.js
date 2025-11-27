import Koa from 'koa';
import Router from '@koa/router';
import http2 from 'http2';
import fs from 'fs';

const app = new Koa();
const router = new Router();

// Routes
router.get('/', (ctx) => {
  ctx.body = { message: 'Koa with HTTP/2!' };
});

router.get('/users', (ctx) => {
  ctx.body = [{ id: 1, name: 'John' }];
});

app.use(router.routes());

// Create HTTP/2 server with Koa
const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
}, app.callback());

server.listen(3000, () => {
  console.log('Koa HTTP/2 server on https://localhost:3000');
});