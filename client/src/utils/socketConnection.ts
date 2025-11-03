import { io } from "socket.io-client";
const options = {
  auth: { token: "skedwjeowpqpqpwkxpfoekwoiej" },
};
const socket = io("http://localhost:3000", options);

export default socket;
