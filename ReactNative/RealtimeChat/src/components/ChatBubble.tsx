import { View, Text, StyleSheet } from "react-native";
import type { Message } from "@/src/types/message";

type ChatBubbleProps = {
  message: Message;
  isOwnMessage: boolean;
};

export function ChatBubble({ message, isOwnMessage }: ChatBubbleProps) {
  return (
    <View style={[styles.row, isOwnMessage ? styles.ownRow : styles.otherRow]}>
      <View style={[styles.bubble, isOwnMessage ? styles.ownBubble : styles.otherBubble]}>
        <Text style={[styles.text, isOwnMessage ? styles.ownText : styles.otherText]}>
          {message.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginVertical: 4,
    paddingHorizontal: 12,
  },
  ownRow: {
    alignItems: "flex-end",
  },
  otherRow: {
    alignItems: "flex-start",
  },
  bubble: {
    maxWidth: "80%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },
  ownBubble: {
    backgroundColor: "#0055ff",
  },
  otherBubble: {
    backgroundColor: "#e8e8e8",
  },
  text: {
    fontSize: 16,
  },
  ownText: {
    color: "#fff",
  },
  otherText: {
    color: "#111",
  },
});
