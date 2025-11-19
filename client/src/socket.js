import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  withCredentials: true,
  reconnectionAttempts: 5,
  timeout: 10000,
});

export default socket;
