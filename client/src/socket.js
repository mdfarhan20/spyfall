import { io } from "socket.io-client";

const socket = io("https://spyfall-subsurf.onrender.com");

export default socket;