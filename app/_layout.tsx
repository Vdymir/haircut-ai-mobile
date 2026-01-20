import { useThemeColor } from '@/src/core/hooks/use-theme-color';
import { initI18n } from '@/src/core/langs/config';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient()

export default function RootLayout() {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);
  const backgroundColor = useThemeColor({}, "background");
  const card = useThemeColor({}, "card");
  const isDark = useColorScheme() === "dark";
  const [loaded, error] = useFonts({
    "RedHatDisplay-Bold": require("../assets/fonts/RedHatDisplay-Bold.ttf"),
    "RedHatDisplay-SemiBold": require("../assets/fonts/RedHatDisplay-SemiBold.ttf"),
    "RedHatDisplay-Black": require("../assets/fonts/RedHatDisplay-Black.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const initializeI18n = useCallback(async () => {
    try {
      const success = await initI18n();
      setIsI18nInitialized(success);
    } catch (error) {
      console.error("Failed to initialize i18n:", error);
      setIsI18nInitialized(false);
    }
  }, []);

  useEffect(() => {
    initializeI18n();
  }, [initializeI18n]);

  useEffect(() => {
    if (loaded || error || !isI18nInitialized) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, isI18nInitialized]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView edges={["top"]} style={{backgroundColor: card}}>
          <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
        </SafeAreaView>
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor } }}>
          <Stack.Screen name="index" />
        </Stack>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
