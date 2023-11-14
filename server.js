const { Server } = require("socket.io");
const PORT = process.env.PORT || 8000;
console.log("process.env.clientUrl", process.env.clientUrl);
const io = new Server(PORT, {
  cors: {
    origin: ["http://localhost:3000", "https://chat-app-next-phi.vercel.app"],
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
