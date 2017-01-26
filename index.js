'use strict';

const Hapi = require('hapi');
const Boom = require("boom");
const Mongoose = require('mongoose');
const handlers = require('./src/handlers.js');

const config = {
  mongo: {
    "url": "mongodb://mohole:mohole@ds129189.mlab.com:29189/mmdb",
    "settings": {
      "db": {
        "native_parser": false
      }
    }
  }
}

Mongoose.connect(config.mongo.url);
const movies = Mongoose.connection.db.collection('movies');

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: 8000
});

server.route({
    method: 'GET',
    path:'/',
    handler: handlers.index
});

server.route({
    method: 'GET',
    path:'/movies',
    handler: (request, reply) => {
      console.log(movies.find().toArray());
      const _movies = movies.find().toArray()
      // console.log(Mongoose.find());
      // const db = request.mongo.db;
      return reply(_movies);
    }
});

server.start((err) => {
  if (err) {
      throw err;
  }
  server.log('info', `Server running at ${server.info.uri}`);
});
