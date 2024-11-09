require("dotenv").config();

const ChatGPT = require("./ChatGPT");

var socket = require('socket.io-client')(process.env.SOCKETIO_URL);

socket.on('connect', function(){
    console.log('[%s]on connect...', socket.id);
    socket.emit('add-user', process.env.CHATROOM_USERID);
});

socket.on('gpt-msg-receive', async function(data){
    const from = data.to;
    const to = data.from;
    const response = await ChatGPT.callChatGPT(data.message);
    socket.emit('send-msg', {from: from, to: to, message: response});
});

socket.on('disconnect', function(){
    console.log('[%s]on disconnect....', socket.id);
});