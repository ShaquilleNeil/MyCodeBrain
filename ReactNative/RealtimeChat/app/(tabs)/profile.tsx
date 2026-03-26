import { View, Text, StyleSheet } from "react-native";
import { UserAvatar } from "@/src/components/UserAvatar";
import type { User } from "@/src/types/user";

// TODO: bind to authenticated user; sync name/avatar with store

const PLACEHOLDER_USER: User = { id: "local", name: "You" };

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <UserAvatar label={PLACEHOLDER_USER.name} size={72} />
        <Text style={styles.name}>{PLACEHOLDER_USER.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  hero: {
    alignItems: "center",
    gap: 12,
    marginTop: 24,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
  },
});
