import React from "react";
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface CustomPressableProps {
  onPress?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function CustomPressable({
  onPress,
  disabled,
  children,
  style,
}: CustomPressableProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        style,
        Platform.OS === "ios" && pressed && styles.pressed,
      ]}
      android_ripple={{
        color: "rgba(255, 255, 255, 0.3)",
        borderless: false,
        foreground: true,
      }}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
