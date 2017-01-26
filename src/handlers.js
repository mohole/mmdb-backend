'use strict';

const FAKE = require('./mock.js');

exports.index = (request, reply) => {
  return reply({
    message: 'The backend is working!',
    timestamp: new Date(),
    routes: [
      {
        path: '/movies',
        verbs: ['GET']
      },
      {
        path: '/movie',
        verbs: ['POST']
      },
      {
        path: '/movie/:id',
        verbs: ['GET', 'PUT', 'DELETE']
      }
    ]
  });
}

exports.getMovies = (request, reply) => {

  return reply(FAKE.data);
}
