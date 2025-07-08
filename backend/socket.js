const { Server } = require("socket.io");

let io = null;
const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A User connected with socketId", socket.id);
  });
};

const getIO = () => {
  if (!io) throw new Error("Socket.io is not initialized");

  return io;
};

module.exports = {
  initSocket,
  getIO,
};
