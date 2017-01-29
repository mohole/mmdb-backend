'use strict';

const Hapi = require('hapi');
const Boom = require("boom");
const Mongoose = require('mongoose');
const handlers = require('./src/handlers.js');
const ObjectId = require('mongodb').ObjectId;

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
      const _movies = movies.find().toArray();
      return reply(_movies);
    }
});

server.route({
    method: 'POST',
    path:'/movies',
    handler: (request, reply) => {
      console.log(request.payload);
      const obj = request.payload;
      const id = movies.insertOne(obj);
      return reply(id);
      // return reply(request.payload);
    }
});

server.route({
    method: 'GET',
    path:'/movie/{id}',
    handler: (request, reply) => {
      const id = request.params.id
      const _movie = movies.findOne(ObjectId(id));
      return reply(_movie);
    }
});

server.route({
    method: 'DELETE',
    path:'/movie/{id}',
    handler: (request, reply) => {
      const id = request.params.id
      const _movie = movies.deleteOne({ "_id": ObjectId(id) });
      return reply(_movie);
    }
});

server.start((err) => {
  if (err) {
      throw err;
  }
  server.log('info', `Server running at ${server.info.uri}`);
});
