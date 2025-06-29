const express = require('express');
const cors = require('cors'); // ✅ Add this line
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const path = require('path');

// ✅ Allow frontend (Vercel) to talk to backend (Render)
app.use(cors());

const io = new Server(http, {
  cors: {
    origin: '*', // You can restrict this to your Vercel URL for better security
    methods: ['GET', 'POST']
  }
});

// Serve static frontend files if needed (for Option 1 only)
app.use(express.static(path.join(__dirname, '../frontend')));

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
