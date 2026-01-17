import { StyleSheet, Text, type TextProps } from "react-native";
import { useThemeColor } from "../../hooks/use-theme-color";

export type TypographyProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link" | "h3";
};

export function Typography({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: TypographyProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const tintColor = useThemeColor({}, "tint");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? { ...styles.link, color: tintColor } : undefined,
        type === "h3" ? styles.h3 : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  defaultSemiBold: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  title: {
    fontSize: 20,
    fontFamily: "RedHatDisplay-Black",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "RedHatDisplay-Bold",
  },
  h3: {
    fontSize: 16,
    fontWeight: "semibold",
    fontFamily: "RedHatDisplay-SemiBold",
  },
  link: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
});
