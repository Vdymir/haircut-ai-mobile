import CustomPressable from '@/src/core/components/custom-pressable';
import { useThemeColor } from '@/src/core/hooks/use-theme-color';
import { useCameraStore } from '@/src/core/stores/useCameraStore';
import { Ionicons } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import useCamera from '../../home/hooks/useCamera';
import PreviewFoto from '../components/preview-foto';

const CameraScreen = () => {
  const textColor = useThemeColor({}, "text");
  const { facing, closeCamera, setPhoto, photo, toggleCameraFacing } = useCameraStore();
  const { openCamera } = useCamera();
  const cameraRef = useRef<CameraView>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const result = await cameraRef.current.takePictureAsync({
          mirror: false, // Desactivar el efecto espejo en la foto
        });
        if (result?.uri) {
          setPhoto(result.uri, facing);
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

  // Si hay una foto, mostrar el preview
  if (photo) {
    return <PreviewFoto />;
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
      <View style={styles.cameraControlTop}>
        <CustomPressable onPress={handleCloseCamera} style={styles.cameraControlTopButton}>
          <Ionicons name="close-outline" size={24} color={textColor} />
        </CustomPressable>
        <CustomPressable onPress={toggleCameraFacing} style={styles.cameraControlTopButton}>
          <Ionicons name="camera-reverse-outline" size={24} color={textColor} />
        </CustomPressable>
      </View>
      <View style={styles.cameraControls}>
        <CustomPressable onPress={takePicture} style={styles.cameraControlButton}>
          <Ionicons name="camera-outline" size={32} color={textColor} />
        </CustomPressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraControlTop: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 20,
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
  cameraControlTopButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.27)',
    borderRadius: 40,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraControlButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.27)',
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraScreen;
