import { View, Text, StyleSheet } from "react-native";
import { UserAvatar } from "@/src/components/UserAvatar";
import { formatTime } from "@/src/utils/formatTime";

type ChatCardProps = {
  name: string;
  lastMessage: string;
  timestamp: string | number;
};

export function ChatCard({ name, lastMessage, timestamp }: ChatCardProps) {
  const timeLabel = formatTime(timestamp);

  return (
    <View style={styles.row}>
      <UserAvatar label={name} size={48} />
      <View style={styles.center}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.preview} numberOfLines={1}>
          {lastMessage}
        </Text>
      </View>
      <Text style={styles.time}>{timeLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  center: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  preview: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: "#888",
  },
});
