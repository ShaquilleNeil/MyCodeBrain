import { View, Text } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";





export default function StatCard({
  icon,
  label,
  value,
  children
}: {
  icon: any;
  label: string;
  value?: number | string;

  children?: React.ReactNode;
}) {
  return (
    <View
      style={{
        backgroundColor: "#1C2A44",
        borderRadius: 20,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flex: 1
      }}
    >

 


      <Text style={{ fontSize: 20, color: "#ffffff", marginBottom: 10 }}>
        <Icon name={icon} size={14} color="white" /> {label}
      </Text>

    
      {children ? (
        children
      ) : (
        <Text style={{ color: "#ffffff", fontSize: 40 }}>
          {value}
        </Text>
      )}
    </View>
  );
}