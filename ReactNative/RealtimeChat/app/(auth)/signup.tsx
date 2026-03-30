import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
// TODO: call signup API; validate and navigate to login or main app

export default function Signup() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20, gap: 10 }}>
            <Text style={{ fontSize: 30, fontWeight: "800" }}>Sign up</Text>
            <Text style={{ fontSize: 10, marginBottom: 20 }}>Enter your full name, email and phone number to sign up.</Text>

            <TextInput style={{ width: "100%", height: 60, borderColor: "gray", borderWidth: 0, marginBottom: 10, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: "#cecdcd85" }} placeholder="Full Name" />
            <TextInput style={{ width: "100%", height: 60, borderColor: "gray", borderWidth: 0, marginBottom: 10, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: "#cecdcd85" }} placeholder="Email" />
            <TextInput style={{ width: "100%", height: 60, borderColor: "gray", borderWidth: 0, marginBottom: 10, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: "#cecdcd85" }} placeholder="Phone Number" />

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
                    marginBottom: 15
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Text style={{ color: "white" }}>Sign up</Text>
                    <Ionicons name="log-in-outline" size={20} color="white" />
                </View>

            </TouchableOpacity>

            <Text>Already have an account? <Text style={{ color: "blue" }} onPress={() => router.push("/(auth)/login")}>Login</Text></Text>
        </View>
    )
}