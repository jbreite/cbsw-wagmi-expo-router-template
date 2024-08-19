import "../polyfills";

import { Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import { handleResponse } from "@mobile-wallet-protocol/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/config";
import { useAccount, WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

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
    console.log("🪨 ~ useEffect ~ inAuthGroup", inAuthGroup);
    console.log("🪨 ~ useEffect ~ isConnected", isConnected);

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
    <Stack>
      <Stack.Screen name="index" />
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
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <InitialLayout />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
