import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
   
<SafeAreaView style={{ flex: 1, backgroundColor: "#fcfcfc", alignItems: "center" }}>

        <View style={{ justifyContent: "flex-start", alignItems: "center", width: "100%", height: "5%", backgroundColor: "#0055ff"  }}>
        <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>Chats</Text>
      </View>

     

</SafeAreaView>
    
  );
}
