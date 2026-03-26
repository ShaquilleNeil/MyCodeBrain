import { View, Text, StyleSheet } from "react-native";

type UserAvatarProps = {
  size?: number;
  label?: string;
};

export function UserAvatar({ size = 44, label = "?" }: UserAvatarProps) {
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={styles.letter}>{label.slice(0, 1).toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: "#d0d0d0",
    alignItems: "center",
    justifyContent: "center",
  },
  letter: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
