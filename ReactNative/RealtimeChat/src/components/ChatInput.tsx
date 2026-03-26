import { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";

type ChatInputProps = {
  placeholder?: string;
};

export function ChatInput({ placeholder = "Message" }: ChatInputProps) {
  const [draft, setDraft] = useState("");

  const onSend = () => {
    // TODO: call chatService.sendMessage / hook to send draft
    setDraft("");
  };

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={draft}
        onChangeText={setDraft}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />
      <Pressable style={styles.send} onPress={onSend}>
        <Text style={styles.sendLabel}>Send</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: 14,
    borderRadius: 22,
    backgroundColor: "#f0f0f0",
    fontSize: 16,
  },
  send: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#0055ff",
  },
  sendLabel: {
    color: "#fff",
    fontWeight: "600",
  },
});
