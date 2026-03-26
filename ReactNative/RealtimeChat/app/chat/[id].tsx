import { FlatList, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChatHeader } from "@/src/components/ChatHeader";
import { ChatBubble } from "@/src/components/ChatBubble";
import { ChatInput } from "@/src/components/ChatInput";
import { useChat } from "@/src/hooks/useChat";

// TODO: load messages for params.id; connect useSocket + chatService for real-time updates

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { messages } = useChat();

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <ChatHeader userName={`Chat ${id ?? ""}`} status="offline" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatBubble message={item} isOwnMessage={false} />
          )}
          contentContainerStyle={styles.list}
        />
        <ChatInput />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fcfcfc",
  },
  flex: {
    flex: 1,
  },
  list: {
    paddingVertical: 8,
  },
});
