const app = require("./index");
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {cors: {origin: 'http://localhost:4200/chat/:email', credentials: true, methods: ["GET", "POST"] }});

io.on('connection', (socket) => {
      
  // join user's own room
    socket.join(socket.user.id);
    socket.join('myRandomChatRoomId');
      
  // find user's all channels from the database and call join event on all of them.
    console.log('a user connected');
      
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
      
    socket.on('my message', (msg) => {
        console.log('message: ' + msg);
        io.emit('my broadcast', `server: ${msg}`);
    });

    socket.on('join', (roomName) => {
        console.log('join: ' + roomName);
        socket.join(roomName);
    });

    socket.on('message', ({message, roomName}, callback) => {
      console.log('message: ' + message + ' in ' + roomName);
        const outgoingMessage = {  // generate data to send to receivers
          message
        };
        socket.to(roomName).emit("message", outgoingMessage);  // send socket to all in room except sender
        callback({
          status: "ok"
        });
    });

});

const port = process.env.PORT || "3000";

server.listen(port,()=>{
    console.log("Server running");
});
