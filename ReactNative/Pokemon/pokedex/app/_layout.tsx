import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>

    <Stack.Screen name="index" options={{ title: "Pokedex"}} />
    <Stack.Screen name="pokemonDetails" options={{ title: "Details", 
      headerBackButtonDisplayMode: "minimal", 
      presentation: 'formSheet',
      sheetAllowedDetents: [0.9] }} />
  </Stack>;
}
