import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

type ChatHeaderProps = {
  userName: string;
  status: "online" | "offline";
};

export function ChatHeader({ userName, status }: ChatHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.bar}>
      <Pressable onPress={() => router.back()} hitSlop={12} style={styles.back}>
        <Ionicons name="chevron-back" size={26} color="#fff" />
      </Pressable>
      <View style={styles.titleBlock}>
        <Text style={styles.title} numberOfLines={1}>
          {userName}
        </Text>
        <Text style={styles.status}>{status === "online" ? "Online" : "Offline"}</Text>
      </View>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: "#0055ff",
  },
  back: {
    padding: 4,
  },
  titleBlock: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  status: {
    fontSize: 12,
    color: "rgba(255,255,255,0.85)",
    marginTop: 2,
  },
  spacer: {
    width: 34,
  },
});
