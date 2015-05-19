#!/bin/env node

const express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    redis = require('redis');

const app = express(),
    host = process.argv[2] || '0.0.0.0', //Redis host
    client = redis.createClient(6379, host);

app.use(express.static(path.join(__dirname, 'dist')));
app.use(favicon(__dirname + 'dist/favicon.ico'));

// curl -H "Content-Type:application/json" http://localhost:3000/api/all
app.get('/api/all', function(req, res) {
    var payload = [];
    client.keys('*', function (err, reply) {
        if (!reply || reply.length === 0) {
            res.json(payload);
        }
        reply.forEach(function(key, index) {
            client.get(key, function(err, value) {
                var entry = {};
                entry.instance = key;
                entry.hits = value;
                payload.push(entry);
                if (index === reply.length-1) {
                    res.json(payload);
                }
            });
        });
    });
});

// curl -X DELETE -H "Content-Type:application/json" http://localhost:3000/api/all
app.delete('/api/all', function(req, res) {
    client.flushdb(); //Delete everything
    res.json({'status': 'Success'});
});

var server = app.listen(3000, function () {
    console.log('Server listening at http://%s:%s', server.address().address, server.address().port);
});

client.on('error', function (err) {
    console.log('Redis error', err);
});
