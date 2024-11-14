// Import your global CSS file
import { Slot, SplashScreen, Stack } from "expo-router";
import "../global.css";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import TimerProvider from "@/context/TimerContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

//this will prevent the screen from auto hiding until loading all the font assets.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Mono": require("../assets/fonts/RobotoMono-Regular.ttf"),
  });
  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);
  if (!fontsLoaded) return null;
  if (!fontsLoaded && !error) return null;
  return (
    <SafeAreaProvider>
      <TimerProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="meditate/[id]" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modal)/adjust-meditation-duration"
            options={{ headerShown: false, presentation: "modal" }}
          />
        </Stack>
      </TimerProvider>
    </SafeAreaProvider>
  );
}
