import StatusBar from "@/src/core/components/status-bar";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheetComponent from "../components/bottom-sheet";
import GridGallery from "../components/grid-gallery";
import Header from "../components/header";

const HomeScreen = () => {
  const handlePressLogin = useCallback(() => {
    router.push("/login");
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <Header onPressLogin={handlePressLogin} />
      <GridGallery />
      <BottomSheetComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
