import path from 'node:path';
import AutoLoad from '@fastify/autoload';
import { FastifyInstance } from 'fastify';
import { FastifyPluginOptions } from 'fastify';
import fastify from 'fastify';

const server: FastifyInstance = fastify({ logger: true });

// Define options for CLI arguments if necessary.
const options: FastifyPluginOptions = {};

export default async function (fastify: FastifyInstance, opts: FastifyPluginOptions) {
  console.log('Registering routes...');

  // Place your custom code here!

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  });
}

server.register(AutoLoad, {
  dir: path.join(__dirname),
  options: Object.assign({}, options)
});

const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' })
    server.log.info(`Server listening on http://localhost:3000`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
