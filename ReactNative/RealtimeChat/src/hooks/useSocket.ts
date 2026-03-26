import { useEffect } from "react";
import { socket } from "@/src/services/socket";

export function useSocket() {
  useEffect(() => {
    // TODO: socket.connect() / socket.disconnect() and register event listeners
    return () => {
      // TODO: cleanup listeners and disconnect if needed
    };
  }, []);

  return { socket };
}
