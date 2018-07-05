import io from 'socket.io-client';
import addSourceToVideo from './videoHelper';

var socket = io();
var currentTime = 0;

// general setup
$('#embedded_video').on('timeupdate', function() {
    currentTime = this.currentTime;
    return false;
});

// emit events
$('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});
$('#play_video').click(function() {
    socket.emit('play video', currentTime);
    $('#embedded_video').get(0).play();
    return false;
});
$('#pause_video').click(function() {
    socket.emit('pause video', currentTime);
    $('#embedded_video').get(0).pause();
    return false;
});
$('#embedded_video').on('ended', function() {
    socket.emit('video ended');
    currentTime = 0;
    console.log('video has ended');
});
$('#add_video').click(function() {
    socket.emit('added video', $('#video_src').val())
    addSourceToVideo($('#video_src').val());
    console.log('added video');
});