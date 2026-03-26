import { useState } from "react";
import type { Message } from "@/src/types/message";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);

  // TODO: add message helpers; subscribe to incoming messages via useSocket / chatService

  return {
    messages,
    setMessages,
  };
}
