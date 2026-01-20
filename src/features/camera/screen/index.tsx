import { useCameraStore } from '@/src/core/stores/useCameraStore';
import { CameraView } from 'expo-camera';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import useCamera from '../../home/hooks/useCamera';

const CameraScreen = () => {
  const { facing, closeCamera, setPhoto } = useCameraStore();
  const { openCamera } = useCamera();
  const cameraRef = useRef<CameraView>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const result = await cameraRef.current.takePictureAsync();
        if (result?.uri) {
          setPhoto(result.uri);
        }
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const handleCloseCamera = useCallback(() => {
    closeCamera();
    router.back();
  }, [closeCamera]);

  useEffect(() => {
    openCamera();
    return () => {
      closeCamera();
    };
  }, [openCamera, closeCamera]);


  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
      <View style={styles.cameraControls}>
        <Button title="Tomar Foto" onPress={takePicture} />
        <Button title="Cerrar" onPress={handleCloseCamera} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
});

export default CameraScreen;
