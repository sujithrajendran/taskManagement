import { io } from "socket.io-client";

const socket = io("https://taskmanagement-backend-xjgy.onrender.com", {
  transports: ["websocket"],
});

export default socket;
