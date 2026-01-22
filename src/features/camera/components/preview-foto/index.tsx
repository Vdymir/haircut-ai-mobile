import CustomPressable from '@/src/core/components/custom-pressable';
import { useThemeColor } from '@/src/core/hooks/use-theme-color';
import { useCameraStore } from '@/src/core/stores/useCameraStore';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image as RNImage, StyleSheet, Text, View } from 'react-native';
import { useFaceValidation } from '../../hooks/useFaceValidation';

const PreviewFoto = () => {
    const { validateFace, isLoading, validationResult, resetValidation } = useFaceValidation();
    const textColor = useThemeColor({}, 'text');
    const { photo, photoFacing, setPhoto } = useCameraStore();
    const [imageWidth, setImageWidth] = useState<number | null>(null);
    const imageStyle = photoFacing === 'front'
        ? [styles.image, { transform: [{ scaleX: -1 }] }]
        : styles.image;

    const handleRetake = useCallback(() => {
        resetValidation();
        setPhoto(null);
        setImageWidth(null);
    }, [resetValidation, setPhoto]);

    // Obtener las dimensiones reales de la imagen
    useEffect(() => {
        if (photo) {
            RNImage.getSize(
                photo,
                (width) => {
                    setImageWidth(width);
                },
                (error) => {
                    console.error('Error getting image size:', error);
                    // Fallback: usar un ancho por defecto si falla
                    setImageWidth(1080);
                }
            );
        }
    }, [photo]);

    // Validar cuando tengamos las dimensiones de la imagen
    useEffect(() => {
        if (photo && imageWidth) {
            validateFace({ imageUri: photo, imageWidth });
        }
    }, [photo, imageWidth, validateFace]);

    if (!photo) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: photo }} style={imageStyle} contentFit="cover" />
            <View style={styles.controls}>
                <CustomPressable onPress={handleRetake} style={styles.button}>
                    <Ionicons name="refresh-outline" size={24} color={textColor} />
                </CustomPressable>
                <CustomPressable
                    style={[
                        styles.acceptButton,
                        !validationResult?.isValid && styles.acceptButtonDisabled
                    ]}
                    disabled={!validationResult?.isValid || isLoading}
                >
                    <Ionicons name="checkmark-outline" size={24} color={textColor} />
                </CustomPressable>
            </View>
            {isLoading && (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}
            {validationResult && !validationResult.isValid && !isLoading && (
                <View style={styles.errorContainer}>
                    <Ionicons name="alert-circle-outline" size={20} color="#fff" />
                    {validationResult.errorMessage && (
                        <Text style={styles.errorText}>
                            {validationResult.errorMessage}
                        </Text>
                    )}
                </View>
            )}
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        width: '100%',
    },
    controls: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.27)',
        borderRadius: 40,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    acceptButton: {
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderRadius: 40,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    acceptButtonDisabled: {
        opacity: 0.5,
        backgroundColor: 'rgba(107, 114, 128, 0.8)',
    },
    errorContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(239, 68, 68, 0.9)',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    errorText: {
        flex: 1,
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default PreviewFoto;