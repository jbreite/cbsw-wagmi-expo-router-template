import "../polyfills";

import { Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import { handleResponse } from "@mobile-wallet-protocol/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/config";
import { useAccount, WagmiProvider } from "wagmi";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { top } = useSafeAreaInsets();

  const { isConnected, status } = useAccount();

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (status === "connecting" || status === "reconnecting") return;

    const inAuthGroup = segments[0] === "(auth)";

    if (isConnected && !inAuthGroup) {
      // Bring the user inside the auth group
      router.replace("/(auth)/wallet"); //Change this to whatever you need
    } else if (!isConnected && inAuthGroup) {
      // Kick the user out of the auth group
      router.replace("/");
    }
  }, [isConnected, status]);

  useEffect(() => {
    const subscription = Linking.addEventListener("url", ({ url }) => {
      console.log("incoming deeplink:", url);
      try {
        handleResponse(url);
        router.back(); //Need this to work with expo router
      } catch (err) {
        console.error(err);
      }
    });

    return () => subscription.remove();
  }, []);

  if (!loaded) {
    return <Slot />;
  }

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "white", marginTop: top },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: false }} //Feel free to control the animation here
      />
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <InitialLayout />
        </QueryClientProvider>
      </WagmiProvider>
    </GestureHandlerRootView>
  );
}
