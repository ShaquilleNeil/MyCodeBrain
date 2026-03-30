import { View, StyleSheet } from "react-native";

export type ChatCardProps = {
  name: string;
  lastMessage: string;
  timestamp: string | number;
};

/**
 * TODO: layout — avatar (left) | name + last message (center) | formatted time (right)
 * TODO: use UserAvatar, formatTime(timestamp) from utils
 */
export function ChatCard(_props: ChatCardProps) {
  return <View style={styles.shell} />;
}

const styles = StyleSheet.create({
  shell: {
    minHeight: 56,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
  },
});
