import { Box, Text, View } from 'native-base';
import React, { Component } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export class Home extends Component {
  render() {
    return (
      <View justifyContent={'center'} alignItems={'center'} justifyItems={'center'} flex={1}>
        <Box>
        <MaterialCommunityIcons name={'qrcode-scan'} size={128} color={'black'}/>
        </Box>
        <Text mt={10} fontSize={24}>QR Scanner</Text>
      </View>
    )
  }
}

export default Home