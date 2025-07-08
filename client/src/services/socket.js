import { io } from "socket.io-client";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const createSocket = () =>
  io(baseUrl, {
    transports: ["websocket"],
    withCredentials: true,
    path: "/socket.io", // optional but safe
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });
