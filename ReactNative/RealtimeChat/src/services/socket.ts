import { io, type Socket } from "socket.io-client";

// TODO: set EXPO_PUBLIC_SOCKET_URL and connect to backend
const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL ?? "http://localhost:3000";

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
});

// TODO: handle connection lifecycle and events (connect, disconnect, message, etc.)
