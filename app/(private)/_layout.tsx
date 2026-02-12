import { useThemeColor } from "@/src/core/hooks/use-theme-color";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function PrivateLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const backgroundColor = useThemeColor({}, "background");

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="camera" />
    </Stack>
  );
}
