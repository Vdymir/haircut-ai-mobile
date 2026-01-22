import CustomPressable from '@/src/core/components/custom-pressable';
import { useThemeColor } from '@/src/core/hooks/use-theme-color';
import { useCameraStore } from '@/src/core/stores/useCameraStore';
import { Ionicons } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useCamera from '../../home/hooks/useCamera';
import FaceGuideOverlay from '../components/face-guide-overlay';
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
          mirror: false,
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

  if (photo) {
    return <PreviewFoto />;
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
      <FaceGuideOverlay />
      <View style={styles.cameraControlTop}>
        <CustomPressable onPress={handleCloseCamera} style={styles.cameraControlTopButton}>
          <Ionicons name="close-outline" size={24} color={textColor} />
        </CustomPressable>
        <CustomPressable onPress={toggleCameraFacing} style={styles.cameraControlTopButton}>
          <Ionicons name="camera-reverse-outline" size={24} color={textColor} />
        </CustomPressable>
      </View>
      <View style={styles.instructionsContainer}>
        <View style={styles.instructionCard}>
          <Ionicons name="information-circle-outline" size={16} color="#fff" />
          <Text style={styles.instructionText}>
            Asegúrate de que tu rostro esté centrado y bien iluminado
          </Text>
        </View>
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
    zIndex: 10,
  },
  camera: {
    flex: 1,
  },
  instructionsContainer: {
    position: 'absolute',
    bottom: 140,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  instructionCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  instructionText: {
    flex: 1,
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  cameraControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    zIndex: 10,
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
