import React from 'react'
import { View } from 'react-native'
import GridGallery from '../components/grid-gallery'
import Header from '../components/header'

const HomeScreen = () => {
  return (
    <View>
      <Header />
      <GridGallery />
    </View>
  )
}

export default HomeScreen