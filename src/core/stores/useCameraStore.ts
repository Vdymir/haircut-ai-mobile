import { CameraType } from 'expo-camera';
import { create } from 'zustand';

interface CameraState {
  facing: CameraType;
  showCamera: boolean;
  photo: string | null;
  setFacing: (facing: CameraType) => void;
  setShowCamera: (show: boolean) => void;
  setPhoto: (photoUri: string | null) => void;
  openCamera: () => void;
  closeCamera: () => void;
  toggleCameraFacing: () => void;
  reset: () => void;
}

const initialState = {
  facing: 'front' as CameraType,
  showCamera: false,
  photo: null,
};

export const useCameraStore = create<CameraState>((set) => ({
  ...initialState,
  setFacing: (facing) => set({ facing }),
  setShowCamera: (show) => set({ showCamera: show }),
  setPhoto: (photoUri) => set({ photo: photoUri }),
  openCamera: () => set({ showCamera: true, facing: 'front' }),
  closeCamera: () => set({ showCamera: false }),
  toggleCameraFacing: () =>
    set((state) => ({
      facing: state.facing === 'back' ? 'front' : 'back',
    })),
  reset: () => set(initialState),
}));
