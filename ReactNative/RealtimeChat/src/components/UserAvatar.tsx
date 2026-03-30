import { View, StyleSheet } from "react-native";

type UserAvatarProps = {
  size?: number;
  label?: string;
};

/**
 * TODO: image or initials placeholder
 */
export function UserAvatar(_props: UserAvatarProps) {
  return <View style={styles.circle} />;
}

const styles = StyleSheet.create({
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#d0d0d0",
  },
});
