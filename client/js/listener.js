import io from 'socket.io-client';
import addSourceToVideo from './videoHelper';

var socket = io();

const videoRef = $("#embedded_video");

// receiver listeners
socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
});
socket.on('added video', function(vidStr) {
    console.log('client side add');
    addSourceToVideo(vidStr);
});
socket.on('play video', function(currentTime) {
    console.log('client side play');
    videoRef.get(0).play();
});
socket.on('pause video', function() {
    console.log('client side pause');
    videoRef.get(0).pause();
});
socket.on('continue video', function(time) {
    videoRef.get(0).play();
    videoRef.on('loadeddata', function() {
        console.log('client side continue loadeddata', time);
        videoRef.get(0).currentTime = time;
    });
    if (videoRef.get(0).readyState > 2) {
        console.log('client side continue readyState', time);
        videoRef.get(0).currentTime = time;
    }
});
