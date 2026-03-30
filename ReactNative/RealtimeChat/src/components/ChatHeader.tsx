import { View, StyleSheet } from "react-native";

type ChatHeaderProps = {
  userName: string;
  status: "online" | "offline";
};

/**
 * TODO: top bar — back button, userName, online/offline status
 */
export function ChatHeader(_props: ChatHeaderProps) {
  return <View style={styles.shell} />;
}

const styles = StyleSheet.create({
  shell: {
    minHeight: 48,
    backgroundColor: "#0055ff",
  },
});
