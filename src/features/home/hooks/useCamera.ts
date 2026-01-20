import { useCameraPermissions } from "expo-camera";
import { useCallback, useEffect } from "react";
import { useCameraStore } from "@/src/core/stores/useCameraStore";

export default function useCamera() {
    const [permission, requestPermission] = useCameraPermissions();
    const { openCamera: openCameraStore } = useCameraStore();

    const requestCameraPermission = useCallback(async () => {
        if (permission?.granted) {
            return true;
        }
        const { status } = await requestPermission();
        if (status !== 'granted') {
            return false;
        }
        return true;
    }, [permission, requestPermission]);

    const openCamera = useCallback(async () => {
        const hasPermission = await requestCameraPermission();
        if (hasPermission) {
            openCameraStore();
        }
    }, [requestCameraPermission, openCameraStore]);

    useEffect(() => {
        requestCameraPermission();
    }, [requestCameraPermission]);

    return {
        openCamera,
        requestCameraPermission,
    }
}