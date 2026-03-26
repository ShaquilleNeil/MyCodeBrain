import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { UserAvatar } from "@/src/components/UserAvatar";

// TODO: call auth API on login; then initialize socket / chat state

export default function Login() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <UserAvatar label="?" size={56} />
      <Text style={{ fontSize: 30, fontWeight: "800", marginTop: 16 }}>Welcome Back</Text>
        <Text style={{ fontSize: 10, marginBottom: 20 }}>Sign in to continue</Text>

          {/* Email Label */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, width: "100%" }}>
        <Text style={{ fontSize: 15, marginBottom: 5, justifyContent: "flex-start" , fontWeight: "600"}}>Email</Text>
      </View>

      <TextInput style={styles.inputFields} placeholder="Email" />




      {/* password  Label */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
        <Text style={{ fontSize: 15, marginBottom: 5, justifyContent: "flex-start" , fontWeight: "600"}}>Password</Text>
        <Text style={{ fontSize: 12, marginBottom: 5, justifyContent: "flex-end" , fontWeight: "600", color: "blue"}} onPress={() => router.push("/(auth)/forgotPassword")}>Forgot Password?</Text>
      </View>

      < TextInput style={styles.inputFields} placeholder="Password" />

      <TouchableOpacity
        style={
         styles.loginButton
        } onPress={() => router.replace("/(tabs)")}> 
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={{ color: "white" }}>Login</Text>
            <Ionicons name="log-in-outline" size={20} color="white" />
         </View>
         
        </TouchableOpacity>



        <View style={styles.container}>
      <View style={styles.line} />

      <Text style={styles.text}>OR CONTINUE WITH</Text>

      <View style={styles.line} />
    </View>


     {/* Two other sign in options */}
    <View style={{ flexDirection: "row", alignItems: "center", gap: 25, marginBottom: 20 }}>
    <TouchableOpacity
        style={
         styles.loginButtonAlt
        }> 
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <FontAwesome name="google" size={30} color="black" />
            <Text style={{ color: "black", fontWeight: "600" }}>Google</Text>
            <Ionicons name="log-in-outline" size={20} color="white" />
         </View>
         
        </TouchableOpacity>

        <TouchableOpacity
        style={
         styles.loginButtonAlt
        } > 
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Icon name="apple" size={30} color="black" />
            <Text style={{ color: "black", fontWeight: "600" }}>Apple</Text>
            <Ionicons name="log-in-outline" size={20} color="white" />
         </View>
         
        </TouchableOpacity>
      </View> 

        <Text>{"Don't have an account? "}<Text style={{ color: "blue" }} onPress={() => router.push("/(auth)/signup")}>Register</Text></Text>
    </View>
  );
}
const styles = StyleSheet.create({
  inputFields: {
    width: "100%",
    height: 60,
    borderColor: "none",
    borderWidth: 0,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#cecdcd85"
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },

  text: {
    marginHorizontal: 10,
    color: "#999",
    fontSize: 12,
    letterSpacing: 1,
  },
  loginButton : {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "80%",
    height: 50,
    justifyContent: "center",
    marginBottom: 15
  },

  loginButtonAlt : {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "45%",
    height: 50,
    justifyContent: "center",
    marginBottom: 15


  }
});