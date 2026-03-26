import { View, Text, StyleSheet } from "react-native";
import { UserAvatar } from "@/src/components/UserAvatar";

// TODO: load contacts from API / store; navigate to chat on row press

export default function Contacts() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <UserAvatar label="C" size={40} />
        <Text style={styles.label}>Contacts Screen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  label: {
    fontSize: 16,
  },
});
