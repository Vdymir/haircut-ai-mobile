import { Typography } from "@/src/core/components/typography";
import { useThemeColor } from "@/src/core/hooks/use-theme-color";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import AppleAuthButton from "../components/apple-button";
import FacebookAuthButton from "../components/facebook-button";
import GoogleAuthButton from "../components/google-button";
import SmoothInfiniteScroll from "../components/smooth-infinite-scroll";

const AnimatedText = Animated.createAnimatedComponent(Typography);

const LoginScreen = () => {
  const backgroundColor = useThemeColor({}, "background");
  const { t } = useTranslation();
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.infiniteScrollContainer}>
        <SmoothInfiniteScroll scrollDirection="up" iconSet="set2" />
        <SmoothInfiniteScroll />
        <SmoothInfiniteScroll scrollDirection="up" iconSet="set3" />
        <LinearGradient
          colors={["transparent", backgroundColor]}
          style={styles.gradientContainer}
        />
      </View>
      <View style={styles.contentContainer}>
        <AnimatedText entering={FadeInDown} type="title" style={styles.title}>
          {t("login.title")}
        </AnimatedText>
        <AnimatedText entering={FadeInDown} style={styles.tagline}>
          {t("login.description")}
        </AnimatedText>

        {/* Login buttons */}
        <View style={styles.buttonContainer}>
          <Animated.View entering={FadeInDown.delay(100)}>
            <AppleAuthButton />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200)}>
            <GoogleAuthButton />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(300)}>
            <FacebookAuthButton />
          </Animated.View>
        </View>

        <Animated.View
          style={styles.privacyContainer}
          entering={FadeInDown.delay(400)}
        >
          <Typography style={styles.privacyText}>
            Please visit{" "}
            <Typography style={styles.privacyLink}>
              Haircut AI Privacy Statement
            </Typography>{" "}
            to learn about personal data processing at Haircut AI.
          </Typography>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infiniteScrollContainer: {
    flex: 0.8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    position: "relative",
    overflow: "hidden",
  },
  gradientContainer: {
    position: "absolute",
    height: 200,
    left: 0,
    bottom: 0,
    right: 0,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 20,
  },
  tagline: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 50,
  },
  buttonContainer: {
    gap: 12,
    width: "100%",
  },
  privacyContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  privacyText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    lineHeight: 18,
  },
  privacyLink: {
    color: "#4285F4",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
