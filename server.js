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
  socket.on("join-room", (data, roomId) => {
    socket.join(roomId);
    socket
      .to(roomId)
      .emit("person-joined", { ...data, text: "Joined The Chat!!!" });
  });
  socket.on("typing", (data, room) => {
    socket.to(room).emit("typing-event", { ...data, value: true });
  });

  socket.on("not-typing", (data, room) => {
    socket.to(room).emit("typing-event", { ...data, value: false });
  });
});
