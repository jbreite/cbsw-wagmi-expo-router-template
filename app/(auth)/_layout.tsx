import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
  const { top } = useSafeAreaInsets();
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "white", marginTop: top },
      }}
    >
      <Stack.Screen name="wallet" options={{ headerShown: false }} />
    </Stack>
  );
}
