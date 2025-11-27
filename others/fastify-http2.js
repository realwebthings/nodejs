import Fastify from 'fastify';
import fs from 'fs';

// Fastify with HTTP/2 support
const fastify = Fastify({
  http2: true,
  https: {
    key: fs.readFileSync('localhost-privkey.pem'),
    cert: fs.readFileSync('localhost-cert.pem')
  }
});

// Routes (Express-like syntax)
fastify.get('/', async (request, reply) => {
  return { message: 'Hello HTTP/2 with Fastify!' };
});

fastify.get('/users', async (request, reply) => {
  return [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
});

fastify.post('/users', async (request, reply) => {
  const user = request.body;
  return { id: Date.now(), ...user };
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Fastify HTTP/2 server running on https://localhost:3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();