import CustomPressable from '@/src/core/components/custom-pressable';
import { Typography } from '@/src/core/components/typography';
import { useThemeColor } from '@/src/core/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface HeaderProps {
  onClickCamera?: () => void;
  onClickSettings?: () => void;
}

const Header = ({ onClickCamera = () => {}, onClickSettings = () => {} }: HeaderProps) => {
  const backgroundColor = useThemeColor({}, "card");
  const borderColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <CustomPressable style={[styles.button, { borderColor }]} onPress={onClickSettings}>
        <Ionicons name="settings-outline" size={24} color={textColor} />
      </CustomPressable>
      <Typography type="title">Haircut AI</Typography>
      <CustomPressable style={[styles.button, { borderColor }]} onPress={onClickCamera}>
        <Ionicons name="camera-outline" size={24} color={textColor} />
      </CustomPressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default Header