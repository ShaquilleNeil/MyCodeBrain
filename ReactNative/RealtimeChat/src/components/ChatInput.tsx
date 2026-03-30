import { View, StyleSheet } from "react-native";

type ChatInputProps = {
  placeholder?: string;
};

/**
 * TODO: TextInput + send control; on send, call chatService / hook
 */
export function ChatInput(_props: ChatInputProps) {
  return <View style={styles.shell} />;
}

const styles = StyleSheet.create({
  shell: {
    minHeight: 48,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
});
