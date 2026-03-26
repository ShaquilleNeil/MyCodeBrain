import type { Message } from "@/src/types/message";

export type ChatStoreState = {
  messages: Message[];
  currentChatId: string | null;
};

export const initialChatState: ChatStoreState = {
  messages: [],
  currentChatId: null,
};

// TODO: replace with Zustand (or similar) to update messages and manage chats reactively
