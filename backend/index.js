const express = require('express');
const cors = require('cors'); // ✅ Import cors
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const path = require('path');

// ✅ Enable CORS for all origins (or restrict to your Vercel URL for security)
app.use(cors());

const io = new Server(http, {
  cors: {
    origin: "*", // Or: "https://your-vercel-app.vercel.app"
    methods: ["GET", "POST"]
  }
});

// ✅ (Optional) Serve static frontend files if you move frontend into backend/public
app.use(express.static(path.join(__dirname, '../frontend')));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
