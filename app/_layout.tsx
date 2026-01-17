import { COLORS } from '@/src/shared/colors';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Stack } from "expo-router";

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: COLORS.primary } }}>
        <Stack.Screen name="index" />
      </Stack>
    </QueryClientProvider>
  )
}
