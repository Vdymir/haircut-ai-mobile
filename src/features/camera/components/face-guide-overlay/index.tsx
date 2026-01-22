import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

const FaceGuideOverlay = () => {
  const { width, height } = useWindowDimensions();

  // Calcular dimensiones del marco guía basado en las validaciones
  // El rostro debe ser al menos 25% del ancho de la imagen
  const guideWidth = width * 0.65; // 65% del ancho para dar margen
  const guideHeight = guideWidth * 1.3; // Proporción aproximada de un rostro
  const guideLeft = (width - guideWidth) / 2;
  const guideTop = height * 0.25; // Posición vertical

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Overlay oscuro con área transparente para el rostro */}
      <View style={styles.overlay}>
        {/* Área superior oscura */}
        <View style={[styles.darkArea, { height: guideTop }]} />

        {/* Área central con marco transparente */}
        <View style={[styles.centerRow, { height: guideHeight }]}>
          {/* Área izquierda oscura */}
          <View style={[styles.darkArea, { width: guideLeft }]} />

          {/* Marco guía para el rostro */}
          <View style={[styles.faceGuide, { width: guideWidth, height: guideHeight }]}>
            {/* Esquinas del marco */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />

            {/* Líneas guía horizontales */}
            <View style={[styles.guideLine, styles.horizontalTop]} />
            <View style={[styles.guideLine, styles.horizontalMiddle]} />
            <View style={[styles.guideLine, styles.horizontalBottom]} />

            {/* Líneas guía verticales */}
            <View style={[styles.guideLine, styles.verticalLeft]} />
            <View style={[styles.guideLine, styles.verticalCenter]} />
            <View style={[styles.guideLine, styles.verticalRight]} />
          </View>

          {/* Área derecha oscura */}
          <View style={[styles.darkArea, { width: guideLeft }]} />
        </View>

        {/* Área inferior oscura */}
        <View style={[styles.darkArea, { flex: 1 }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    flex: 1,
  },
  darkArea: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centerRow: {
    flexDirection: 'row',
  },
  faceGuide: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#fff',
  },
  topLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  topRight: {
    top: -2,
    right: -2,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  guideLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  horizontalTop: {
    top: '25%',
    left: '20%',
    right: '20%',
    height: 1,
  },
  horizontalMiddle: {
    top: '50%',
    left: '20%',
    right: '20%',
    height: 1,
  },
  horizontalBottom: {
    top: '75%',
    left: '20%',
    right: '20%',
    height: 1,
  },
  verticalLeft: {
    left: '20%',
    top: '15%',
    bottom: '15%',
    width: 1,
  },
  verticalCenter: {
    left: '50%',
    top: '15%',
    bottom: '15%',
    width: 1,
    marginLeft: -0.5,
  },
  verticalRight: {
    right: '20%',
    top: '15%',
    bottom: '15%',
    width: 1,
  },
});

export default FaceGuideOverlay;
