import { View, Text } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";

// You can move this later to a utils file if you want
function getWeatherUI(main: string) {
  switch (main) {
    case "Clear":
      return { icon: "wb-sunny", color: "#FFD93D" };

    case "Clouds":
      return { icon: "cloud", color: "#B0BEC5" };

    case "Rain":
    case "Drizzle":
      return { icon: "grain", color: "#4FC3F7" };

    case "Thunderstorm":
      return { icon: "flash-on", color: "#9575CD" };

    case "Snow":
      return { icon: "ac-unit", color: "#81D4FA" };

    default:
      return { icon: "help-outline", color: "#aaa" };
  }
}

export default function ForecastCard({
  day,
  temp,
  main
}: {
  day: string;
  temp: number;
  main: string;
}) {
  const ui = getWeatherUI(main);

  return (
    <View style={{ alignItems: "center", flex: 1, gap: 10 }}>
      <Text style={{ color: "#aaa" }}>{day}</Text>
      <Icon name={ui.icon} size={24} color={ui.color} />
      <Text style={{ color: "white", fontSize: 18 }}>{temp}°C</Text>
    </View>
  );
}