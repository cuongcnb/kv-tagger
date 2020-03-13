const config = require('config');
const express = require('express');

const app = express();

const server = require('http').createServer(app);
server.listen(config.get('port'), config.get('ip'));

app.get('/ping', function (req, res) {
    console.log("Some one ping me!");
    res.status(200).json({ messet: 'pong' });
});

require('./routers')(app);

console.log('Server started!')