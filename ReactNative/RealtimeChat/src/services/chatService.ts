import type { Message } from "@/src/types/message";
import { socket } from "@/src/services/socket";

export function sendMessage(_text: string, _receiverId: string): void {
  // TODO: emit via socket (e.g. socket.emit('send_message', ...))
  void socket;
}

export function receiveMessage(_handler: (message: Message) => void): () => void {
  // TODO: socket.on('message', handler) and return cleanup
  void _handler;
  return () => {
    // TODO: socket.off(...)
  };
}
