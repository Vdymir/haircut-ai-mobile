import * as FaceDetector from 'expo-face-detector';
import { useCallback, useState } from 'react';
import { generateMessage } from '../utils/generate-message';

type FaceValidationResult = {
  isValid: boolean;
  errorMessage?: string;
};

type ValidateFaceParams = {
  imageUri: string;
  imageWidth: number;
};

export const useFaceValidation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [validationResult, setValidationResult] = useState<FaceValidationResult | null>(null);

  const validateFace = useCallback(async ({
    imageUri,
    imageWidth,
  }: ValidateFaceParams): Promise<FaceValidationResult> => {
    try {
      setIsLoading(true);
      setValidationResult(null);

      const result = await FaceDetector.detectFacesAsync(imageUri, {
        mode: FaceDetector.FaceDetectorMode.fast,
        detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
        runClassifications: FaceDetector.FaceDetectorClassifications.none,
      });

      // ❌ No face detected
      if (result.faces.length === 0) {
        const validationResult: FaceValidationResult = {
          isValid: false,
          errorMessage: generateMessage('NO_FACE'),
        };
        setValidationResult(validationResult);
        return validationResult;
      }

      // ❌ Multiple faces detected
      if (result.faces.length > 1) {
        const validationResult: FaceValidationResult = {
          isValid: false,
          errorMessage: generateMessage('MULTIPLE_FACES'),
        };
        setValidationResult(validationResult);
        return validationResult;
      }

      const face = result.faces[0];
      const faceWidthRatio = face.bounds.size.width / imageWidth;
      const faceCenterX = face.bounds.origin.x + face.bounds.size.width / 2;
      const imageCenterX = imageWidth / 2;
      const centerOffset = Math.abs(faceCenterX - imageCenterX);
      
      // Calcular el offset como porcentaje del ancho de la imagen
      const centerOffsetRatio = centerOffset / imageWidth;

      // ❌ Face too small
      if (faceWidthRatio < 0.25) {
        const validationResult: FaceValidationResult = {
          isValid: false,
          errorMessage: generateMessage('FACE_TOO_SMALL'),
        };
        setValidationResult(validationResult);
        return validationResult;
      }

      // ❌ Face not centered - Usar un umbral más flexible (25% en lugar de 15%)
      // También considerar el tamaño del rostro: si el rostro es grande, ser más estricto
      const maxAllowedOffset = faceWidthRatio > 0.4 
        ? 0.20  // Rostro grande: permitir hasta 20% de offset
        : 0.25; // Rostro normal: permitir hasta 25% de offset
      
      if (centerOffsetRatio > maxAllowedOffset) {
        const validationResult: FaceValidationResult = {
          isValid: false,
          errorMessage: generateMessage('FACE_NOT_CENTERED'),
        };
        setValidationResult(validationResult);
        return validationResult;
      }

      // ✅ Face is valid
      const validationResult: FaceValidationResult = {
        isValid: true,
      };
      setValidationResult(validationResult);
      return validationResult;
    } catch (error: unknown) {
      console.error('Error validating face:', error);
      const validationResult: FaceValidationResult = {
        isValid: false,
        errorMessage: generateMessage('GENERIC_ERROR'),
      };
      setValidationResult(validationResult);
      return validationResult;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetValidation = useCallback(() => {
    setValidationResult(null);
    setIsLoading(false);
  }, []);

  return { 
    validateFace, 
    isLoading, 
    validationResult,
    resetValidation,
  };
};
