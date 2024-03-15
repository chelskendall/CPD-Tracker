const app = require("./index");
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {cors: {origin: 'http://localhost:4200/user/:email', methods: ["GET", "POST"]}});

//youtube code
//event listeners to handle sending messages, joining/leaving rooms etc
/*
io.on('connection', (socket) => {
    console.log('A user connected');

   socket.on('message', (data) => {
        console.log('Your Message: ', data);
        socket.broadcast.emit('message', data);
      });
    
    // Disconnect event
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

});*/


//https://socket.io/get-started/private-messaging-part-1/#running-the-frontend & swag-coder
io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  // fetch existing users
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);

  // notify existing users
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });

  // forward the private message to the right recipient
  socket.on("private message", ({ content, to }) => {
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    });
  });

  // notify users upon disconnection
  socket.on("disconnect", () => {
    socket.broadcast.emit("user disconnected", socket.id);
  });

  //swag-coder
  /*
  socket.on('join', (data) => {
    socket.join(data.room);
    socket.broadcast.to(data.room).emit('user joined');
  });

  socket.on('message', (data) => {
      io.in(data.room).emit('new message', {user: data.user, message: data.message});
  });*/

});

const port = process.env.PORT || "3000";

server.listen(port,()=>{
    console.log("Server running");
});




/*const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000/chat",
        methods: ["GET", "POST"]
      }
});
//const io = require("socket.io")(http);*/

/*
//emitting a “message” event to all connected clients
io.on('connection', (socket) => {
    console.log('Connected');
  
    socket.on('message', (data) => {
      console.log('Your Message: ', data);
      io.emit('message', data);
    });
});

//event listeners for incoming socket connections
io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('message', (data) => {
      console.log('Received message:', data);
    });
});
*/
  
 /*   
    // Join a room
    socket.on('joinRoom', (room) => {
      console.log(`${socket.id} just joined room ${room}`);
      socket.join(room);
      io.to(room).emit('roomJoined', `${socket.id} just joined the room`);
    });
  
    // Leave a room
    socket.on('leaveRoom', (room) => {
      console.log(`${socket.id} has left room ${room}`);
      socket.leave(room);
      io.to(room).emit('roomLeft', `${socket.id} has left the room`);
    });
  
  
    // Post a message to a specific room
    socket.on('messageToRoom', (data) => {
      console.log(`${socket.id} posted a message to room ${data.room}: ${data.message}`); 
      io.to(data.room).emit('message', {
        id: socket.id,
        message: data.message
      });
    });
  
  
    // Send a message to all connected clients
    socket.on('message', (data) => {
      console.log(`${socket.id} sent a message to clients: ${data.message}`);  
      io.emit('message', {
        id: socket.id,
        message: data.message
      });  
    });
    */

/*    
    //https://deepinder.me/creating-a-real-time-app-with-angular-8-and-socket-io-with-nodejs#creating-an-angular-app
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

    // generate data to send to receivers
    const outgoingMessage = {
      name: socket.user.name,
      id: socket.user.id,
      message,
    };
    // send socket to all in room except sender
    socket.to(roomName).emit("message", outgoingMessage);
    callback({
      status: "ok"
    });
    // send to all including sender
    // io.to(roomName).emit('message', message);
  })
});
*/

