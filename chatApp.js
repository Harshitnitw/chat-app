// Import required modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create an instance of Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.sendFile('/workspaces/codespaces-blank/index.html');
  });
  

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for new messages
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast the message to all connected clients
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
