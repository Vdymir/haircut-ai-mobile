import StatusBar from '@/src/core/components/status-bar';
import { router } from 'expo-router';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import GridGallery from '../components/grid-gallery';
import Header from '../components/header';

const HomeScreen = () => {

  const openCamera = useCallback(() => {
    router.push('/camera');
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar />
      <Header onClickCamera={openCamera} />
      <GridGallery />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;