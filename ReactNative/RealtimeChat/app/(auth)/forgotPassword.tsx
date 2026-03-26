import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { UserAvatar } from "@/src/components/UserAvatar";

// TODO: call password-reset API

export default function ForgotPassword() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <UserAvatar label="!" size={56} />
      <Text style={{ fontSize: 40, fontWeight: "600", marginTop: 12 }}>Forgot Password</Text>
      <Text style={{ fontSize: 10, marginBottom: 20 }}>Enter your email address to reset your password.</Text>

      <TextInput style={{ width: "100%", height: 60, borderColor: "gray", borderWidth: 1, marginBottom: 10, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: "#cecdcd" }} placeholder="Email" />

      <TouchableOpacity
        style={{
          backgroundColor: "blue",
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 10,
          width: "60%",
          height: 50,
          justifyContent: "center",
          marginBottom: 10
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text style={{ color: "white" }}>Send Reset Link</Text>
          <Ionicons name="link" size={20} color="white" />
        </View>

      </TouchableOpacity>

     

      </View>
    );
  }
