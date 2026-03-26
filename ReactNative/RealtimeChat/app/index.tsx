import { Redirect } from "expo-router";

// TODO: redirect to (tabs) when session exists

export default function Index() {
  return <Redirect href="/(auth)/login" />;
}