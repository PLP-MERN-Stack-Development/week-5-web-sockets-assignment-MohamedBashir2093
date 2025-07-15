const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

let users = {}; // socket.id => { username, room }
let roomUsers = {}; // room => Set of usernames (no duplicates)

io.on('connection', (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on('joinRoom', ({ username, room }) => {
    users[socket.id] = { username, room };
    socket.join(room);

    // Initialize room with Set to prevent duplicates
    if (!roomUsers[room]) {
      roomUsers[room] = new Set();
    }

    // Add user to room
    roomUsers[room].add(username);

    // Send updated users list
    io.to(room).emit('updateUsers', Array.from(roomUsers[room]));

    // Send join message
    io.to(room).emit('chatMessage', {
      user: 'System',
      text: `${username} joined ${room}`,
      time: new Date().toLocaleTimeString()
    });
  });

  socket.on('chatMessage', (msgData) => {
    const { room } = users[socket.id] || {};
    if (room) {
      io.to(room).emit('chatMessage', msgData);
    }
  });

  socket.on('privateMessage', ({ to, msg }) => {
    const sender = users[socket.id]?.username;
    const room = users[socket.id]?.room;

    const recipientSocket = Object.entries(users).find(
      ([, u]) => u.username === to && u.room === room
    );

    const messageData = {
      user: sender,
      text: msg,
      time: new Date().toLocaleTimeString()
    };

    if (recipientSocket) {
      io.to(recipientSocket[0]).emit('privateMessage', messageData);
      socket.emit('privateMessage', messageData);
    }
  });

  socket.on('typing', (room) => {
    const user = users[socket.id]?.username;
    socket.to(room).emit('userTyping', user);
  });

  socket.on('stopTyping', (room) => {
    socket.to(room).emit('userStopTyping');
  });

  socket.on('disconnect', () => {
    const userData = users[socket.id];
    if (!userData) return;

    const { username, room } = userData;

    // Remove from users map
    delete users[socket.id];

    // Remove from roomUsers set
    if (roomUsers[room]) {
      roomUsers[room].delete(username);
      io.to(room).emit('updateUsers', Array.from(roomUsers[room]));

      io.to(room).emit('chatMessage', {
        user: 'System',
        text: `${username} left ${room}`,
        time: new Date().toLocaleTimeString()
      });
    }

    console.log(`❌ ${username} disconnected`);
  });
});

server.listen(3001, () => {
  console.log('✅ Server running on http://localhost:3001');
});
