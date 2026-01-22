import CustomPressable from '@/src/core/components/custom-pressable';
import { Typography } from '@/src/core/components/typography';
import { useThemeColor } from '@/src/core/hooks/use-theme-color';
import { useCameraStore } from '@/src/core/stores/useCameraStore';
import { Ionicons } from '@expo/vector-icons';
import BottomSheetGorhom, { BottomSheetView, useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const BottomSheetComponent = () => {
    const { t } = useTranslation();
    const backgroundColor = useThemeColor({}, "card");
    const galleryButton = useThemeColor({}, "galleryButton");
    const cameraButton = useThemeColor({}, "cameraButton");
    const { setPhoto } = useCameraStore();
    const bottomSheetRef = useRef<BottomSheetGorhom>(null);
    const snapPoints = useMemo(() => ['18%', '50%'], []);

    const animationConfigs = useBottomSheetSpringConfigs({
        damping: 80,
        overshootClamping: true,
        stiffness: 500,
    });

    const handleGallery = useCallback(async () => {
        try {
            // Solicitar permisos
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert(
                    t('gallery_permission_title'),
                    t('gallery_permission_message'),
                    [{ text: t('gallery_permission_button') }]
                );
                return;
            }

            // Abrir el selector de imágenes
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const selectedImage = result.assets[0];

                // Guardar la foto en el store (sin facing ya que viene de galería)
                setPhoto(selectedImage.uri);

                // Redirigir a la vista de camera
                router.push('/camera');
            }
        } catch (error) {
            console.error('Error selecting image from gallery:', error);
            Alert.alert(
                t('gallery_permission_error_title'),
                t('gallery_permission_error_message'),
                [{ text: t('gallery_permission_error_button') }]
            );
        }
    }, [setPhoto]);

    const handleCamera = useCallback(() => {
        router.push('/camera');
    }, []);

    return (
        <GestureHandlerRootView style={styles.container}>
            <BottomSheetGorhom
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                animationConfigs={animationConfigs}
                animateOnMount={true}
                enableDynamicSizing={false}
                backgroundStyle={{ backgroundColor }}
            >
                <BottomSheetView style={styles.content}>
                    <View style={styles.buttonsContainer}>
                        {/* gallery button */}
                        <CustomPressable onPress={handleGallery} style={[styles.button, { backgroundColor: galleryButton }]}>
                            <Ionicons name="images-outline" size={24} color="#FFFFFF" />
                            <Typography type="subtitle" lightColor='#FFFFFF'>{t('gallery_title')}</Typography>
                        </CustomPressable>
                        {/* camera button */}
                        <CustomPressable onPress={handleCamera} style={[styles.button, { backgroundColor: cameraButton }]}>
                            <Ionicons name="camera-outline" size={24} color="#FFFFFF" />
                            <Typography type="subtitle" lightColor='#FFFFFF'>{t('camera_title')}</Typography>
                        </CustomPressable>
                    </View>
                </BottomSheetView>
            </BottomSheetGorhom>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    button: {
        width: '50%',
        padding: 16,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.27)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
});

export default BottomSheetComponent;