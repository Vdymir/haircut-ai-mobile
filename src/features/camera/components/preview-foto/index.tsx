import CustomPressable from '@/src/core/components/custom-pressable';
import { useThemeColor } from '@/src/core/hooks/use-theme-color';
import { useCameraStore } from '@/src/core/stores/useCameraStore';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const PreviewFoto = () => {
    const textColor = useThemeColor({}, 'text');
    const { photo, photoFacing, setPhoto } = useCameraStore();

    const handleRetake = () => {
        setPhoto(null);
    };

    if (!photo) {
        return null;
    }

    // Aplicar transformación solo si la foto fue tomada con la cámara frontal
    // para corregir el efecto espejo
    const imageStyle = photoFacing === 'front'
        ? [styles.image, { transform: [{ scaleX: -1 }] }]
        : styles.image;

    return (
        <View style={styles.container}>
            <Image source={{ uri: photo }} style={imageStyle} contentFit="cover" />
            <View style={styles.controls}>
                <CustomPressable onPress={handleRetake} style={styles.button}>
                    <Ionicons name="refresh-outline" size={24} color={textColor} />
                </CustomPressable>
                <CustomPressable style={styles.acceptButton}>
                    <Ionicons name="checkmark-outline" size={24} color={textColor} />
                </CustomPressable>
            </View>
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
});

export default PreviewFoto;