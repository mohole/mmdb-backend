'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 8000
});

// Add the route
server.route({
    method: 'GET',
    path:'/',
    handler: (request, reply) => {
      return reply({info: 'application initialized'});
    }
});

server.start((err) => {
  if (err) {
      throw err;
  }
  server.log('info', `Server running at ${server.info.uri}`);
});
