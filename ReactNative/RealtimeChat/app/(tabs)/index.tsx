import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { type Href, useRouter } from "expo-router";
import { ChatCard } from "@/src/components/ChatCard";
import { useSocket } from "@/src/hooks/useSocket";

// TODO: replace mock rows with chat list from store / API; open chat on press

const MOCK_CHATS = [
  { id: "1", name: "Alex", lastMessage: "See you tomorrow!", timestamp: Date.now() },
  { id: "2", name: "Jamie", lastMessage: "Sounds good.", timestamp: Date.now() - 86400000 },
];

export default function Index() {
  const router = useRouter();
  useSocket();

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {MOCK_CHATS.map((chat) => (
          <Pressable
            key={chat.id}
            onPress={() => router.push(`/chat/${chat.id}` as Href)}
            android_ripple={{ color: "#eee" }}
          >
            <ChatCard name={chat.name} lastMessage={chat.lastMessage} timestamp={chat.timestamp} />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fcfcfc",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 12,
    backgroundColor: "#0055ff",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
});
