import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColor } from '../../hooks/use-theme-color';

const StatusBar = () => {
  const isDark = useColorScheme() === "dark";
  const card = useThemeColor({}, "card");
  
  return (
    <SafeAreaView edges={["top"]} style={{backgroundColor: card}}>
    <ExpoStatusBar style={isDark ? "light" : "dark"} />
  </SafeAreaView>
  )
}

export default StatusBar