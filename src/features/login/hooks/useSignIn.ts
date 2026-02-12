import { useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect } from "react";
import { Platform } from "react-native";
// Preloads the browser for Android devices to reduce authentication load time
// See: https://docs.expo.dev/guides/authentication/#improving-user-experience
export const useWarmUpBrowser = () => {
  useEffect(() => {
    if (Platform.OS !== "android") return;
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function useSignIn() {
  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO();
  useWarmUpBrowser();
  const handleSignIn = useCallback(
    async (method: "oauth_google" | "oauth_github") => {
      try {
        // Start the authentication process by calling `startSSOFlow()`
        const { createdSessionId, setActive } = await startSSOFlow({
          strategy: method,
          redirectUrl: AuthSession.makeRedirectUri(),
        });

        // If sign in was successful, set the active session
        if (createdSessionId) {
          setActive!({
            session: createdSessionId,
          });
          router.replace("/(private)");
        }
      } catch (err) {
        console.error(JSON.stringify(err, null, 2));
      }
    },
    [startSSOFlow],
  );
  return { handleSignIn };
}
