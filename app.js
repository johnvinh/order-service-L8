'use strict';

const path = require('path');
const fastify = require('fastify')({ logger: true });
const AutoLoad = require('@fastify/autoload');

// Register CORS plugin
fastify.register(require('@fastify/cors'), {
  origin: '*',
});

// Load all plugins from the `plugins` directory
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
  options: {},
});

// Load all routes from the `routes` directory
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
  options: {},
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ host: '0.0.0.0', port: 3000 });
    fastify.log.info(`Server running at http://0.0.0.0:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
