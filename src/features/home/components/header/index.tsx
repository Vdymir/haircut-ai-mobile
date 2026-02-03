import CustomPressable from "@/src/core/components/custom-pressable";
import { Typography } from "@/src/core/components/typography";
import { useThemeColor } from "@/src/core/hooks/use-theme-color";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

interface HeaderProps {
  onPressLogin?: () => void;
}

const Header = ({ onPressLogin = () => {} }: HeaderProps) => {
  const { t } = useTranslation();
  const backgroundColor = useThemeColor({}, "card");
  const loginButtonColor = useThemeColor({}, "loginButton");

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Typography type="title">Haircut AI</Typography>
      <CustomPressable
        style={[styles.button, { backgroundColor: loginButtonColor }]}
        onPress={onPressLogin}
      >
        <Typography lightColor="#FFF" darkColor="#000">
          {t("login_title")}
        </Typography>
      </CustomPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 18,
  },
});

export default Header;
