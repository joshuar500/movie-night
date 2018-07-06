const Bundler = require('parcel-bundler');
const Path = require('path');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const trackTime = require('./helper');

var port = process.env.PORT || 3000;

const indexHtml = './client/index.html';
const options = {};
const bundler = new Bundler(indexHtml, options);

app.use(bundler.middleware());

app.get('/', function(req, res){
  res.sendFile(indexHtml);
});

// global settings
let isPlaying = false;
let videoString = undefined;

io.on('connection', function(socket){
    // connection settings
    if (videoString !== undefined) {
        socket.emit('added video', videoString);
    }

    if (trackTime.currentTime && isPlaying) {
        console.log('continue playing video at', trackTime.currentTime);
        io.emit('continue video', trackTime.currentTime);
    }
    
    // listeners
    socket.on('chat message', function(msg){
        console.log('chat message received');
        io.emit('chat message', msg);
    });
    socket.on('added video', function(vidStr){
        console.log('added video');
        io.emit('added video', vidStr);
        videoString = vidStr;
    });
    socket.on('play video', function(time){
        console.log('play video received', time);
        io.emit('play video', time);
        trackTime.currentTime = time;
        trackTime.start();
        isPlaying = true;
    });
    socket.on('pause video', function(time){
        console.log('pause video received', time);
        io.emit('pause video', time);
        trackTime.currentTime = time;
        trackTime.stop();
        isPlaying = false;
    });
    socket.on('video ended', function(){
        console.log('video ended');
        trackTime.currentTime = 0;
        trackTime.stop();
        isPlaying = false;
    });
    socket.on('disconnect', function(){
        // console.log('user disconnected');
    });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});