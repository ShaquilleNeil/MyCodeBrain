import { View, StyleSheet } from "react-native";
import type { Message } from "@/src/types/message";

type ChatBubbleProps = {
  message: Message;
  isOwnMessage: boolean;
};

/**
 * TODO: render one message bubble; align right when isOwnMessage
 */
export function ChatBubble(_props: ChatBubbleProps) {
  return <View style={styles.shell} />;
}

const styles = StyleSheet.create({
  shell: {
    minHeight: 36,
    marginVertical: 4,
    paddingHorizontal: 12,
  },
});
