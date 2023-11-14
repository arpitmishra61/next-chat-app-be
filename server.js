const { Server } = require("socket.io");
const PORT = process.env.PORT || 8000;
const io = new Server(PORT, {
  cors: {
    origin: ["http://localhost:3000", process.env.clientUrl],
  },
});

io.on("connection", (socket) => {
  console.log("connected", socket.id);
  socket.on("message", (message, room) => {
    if (room) socket.to(room).emit("receive-message", message);
  });
  socket.on("join-room", (roomId, cb) => {
    socket.join(roomId);
    cb();
  });
});
