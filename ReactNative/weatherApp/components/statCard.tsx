import { View, Text } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";


type StatType = "humidity" | "wind" | "visibility";


function formatValue(type: string, value: number | string | undefined) {
  if (!value) return "--";

  switch (type) {
    case "humidity":
      return `${value}%`;

    case "wind":
      return `${value} km/h`;

    case "visibility":
      return `${value} km`;

    default:
      return value;
  }
}

export default function StatCard({
  icon,
  label,
  value,
  children,
  type
}: {
  icon: any;
  label: string;
  value?: number | string;
  children?: React.ReactNode;
  type: StatType;
}) {
  return (
    <View
    style={{
      backgroundColor: "rgba(255,255,255,0.08)",
      borderRadius: 20,
      padding: 15,
      flex: 1,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.15)",
      shadowColor: "#000",
shadowOpacity: 0.2,
shadowRadius: 10,
shadowOffset: { width: 0, height: 5 },
elevation: 5,
    }}
    >

 


      <Text style={{ fontSize: 12, color: "#ffffff", marginBottom: 10 }}>
        <Icon name={icon} size={14} color="white" /> {label}
      </Text>

    
      {children ? (
        children
      ) : (
        <Text style={{ color: "#ffffff", fontSize: 25, fontWeight: "600" }}>
          {formatValue(type, value)}
        </Text>
      )}
    </View>
  );
}