import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Label } from "@react-navigation/elements";
import { IconSymbol } from "@/app-example/components/ui/icon-symbol.ios";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Login() {
  return (
    <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", padding: 20 }}>
        <Text style={{ fontSize: 40, fontWeight: "600" }} >Welcome Back</Text>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Sign in to continue</Text>

      
      <TextInput style={styles.inputFields} placeholder="Email" />
      < TextInput style={styles.inputFields} placeholder="Password" />

      <TouchableOpacity
        style={
         styles.loginButton
        }> 
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={{ color: "white" }}>Login</Text>
            <Ionicons name="log-in-outline" size={20} color="white" />
         </View>
         
        </TouchableOpacity>

        <Text>Don't have an account? <Text style={{ color: "blue" }} onPress={() => router.push("/(auth)/signup")}>Register</Text></Text>
    </View>
  );
}
const styles = StyleSheet.create({
  inputFields: {
    width: "100%",
    height: 60,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10
  },

  loginButton : {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "60%",
    height: 50,
    justifyContent: "center",
    marginBottom: 10


  }
});