#!/bin/env node

const express = require('express'),
    hostname = require('os').hostname(),
    redis = require('redis');

const app = express(),
    host = process.argv[2] || '0.0.0.0'; //Redis host

// curl -H "Content-Type:application/json" http://localhost:3000/api/status
app.get('/api/status', function(req, res) {
    var client = redis.createClient(6379, host);
    var payload = {};
    payload.hostname = hostname;
    payload.timestamp = Date.now();
    client.incr(hostname, function (err) {
        if (err) console.log('Redis incr error:', err);
        client.quit();
    });
    res.json(payload);
    client.on('error', function (err) {
        console.log('Redis error', err);
    });
});

var server = app.listen(3000, function () {
    console.log('Server listening at http://%s:%s', server.address().address, server.address().port);
});
