import React, { useEffect, useState } from 'react'
import { Button, FlatList, Input, Text, TextArea, View, Flex, Box, HStack } from 'native-base'
import { AreaVerScreenRouteProp, MainStackParamList } from '../../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { border } from 'native-base/lib/typescript/theme/styled-system';

interface DataItem {
  areaId: number;
  main: string;
  second: string;
  thirth: string;
  description: string;
  active: boolean;
}

const AreaVer = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {
  const [data, setData] = useState<DataItem[]>([]);
  const route = useRoute<AreaVerScreenRouteProp>();

  useEffect(() => {
    getAreas();
  }, []);

  const editArea = (areaId: number) => {
    navigation.navigate('AreaEditar', { areaId: areaId });
  }

  const getAreas = () => {
    axios.get('http://192.168.1.70:3000/areas/' + route.params.areaId)
      .then((response) => {
        setData(response.data.areas);
      })
      .catch((error) => {
      })
  }

  const toggleSwitch = () => {
    if (data.length > 0) {
      const updatedData = data.map(item => ({ ...item, active: !item.active })); // Update all items in the array
      setData(updatedData);
      // Here you can also make a network request to update the "active" state on the server
    }
  }

  const renderDataItem = ({ item }: { item: DataItem }) => (
    <View flex={1}>
      <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <View style={styles.fabAtras}>
              <Text style={styles.fabTxtAtras}>atras</Text>
            </View>
          </TouchableOpacity>
      {data.length > 0 && (
        <Flex direction="column" m={5}>
          <Text fontSize={'md'} fontWeight={'light'} mt={5}>ID del área</Text>
          <Input
            value={item.areaId.toString()}
            size={'lg'}
            variant={'underlined'}
            placeholder="areaId"
            editable={false}
            fontWeight={'light'}
          />
          <Text fontSize={'md'} fontWeight={'light'} mt={5}>Principal</Text>
          <Input
            value={item.main}
            size={'lg'}
            variant={'underlined'}
            placeholder="Principal"
            editable={false}
            fontWeight={'light'}
          />
          <Text fontSize={'md'} fontWeight={'light'} mt={5}>Secundario</Text>
          <Input
            value={item.second}
            size={'lg'}
            variant={'underlined'}
            placeholder="Secundario"
            editable={false}
            fontWeight={'light'}
          />
          <Text fontSize={'md'} fontWeight={'light'} mt={5}>Terciario</Text>
          <Input
            value={item.thirth}
            size={'lg'}
            variant={'underlined'}
            placeholder="Terciario"
            editable={false}
            fontWeight={'light'}
          />
          <Text fontSize={'md'} fontWeight={'light'} mt={'5'}>  Descripción</Text>
          <TextArea mt={2.5} size={'lg'} value={item.description} placeholder='Descripción' editable={false} />
          <HStack space={3} justifyContent='flex-start'>
            <Box mt={5} ml={-4} maxH={'10'} maxW={'60'} w={'60'} justifyContent={'center'}>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={data[0].active ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={data[0].active}
                style={{ left: 0 }}
              />
            </Box>
            <Box mt={5} maxH={'10'} maxW={'20'}>
              <Text mt={'2'} size={'lg'} fontWeight={'light'}>{data[0].active ? 'Activado' : 'Inactivo'}</Text>
            </Box>
          </HStack>
          <TouchableOpacity
            style={styles.fabLocation}
            onPress={() => editArea(item.areaId)}>
            <View style={styles.fab}>
              <Text style={styles.fabTxt}>Editar</Text>
            </View>
          </TouchableOpacity>
        </Flex>
      )}
    </View>

  );
  return (
    <View flex={1}>
      <FlatList
        data={data}
        renderItem={renderDataItem}
        keyExtractor={(item) => item.areaId.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#193250',
    width: 120,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center'
  },
  fabTxt: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '200'
  },
  fabLocation: {
    marginTop: 50,
    alignSelf: 'center'
  },
  fabAtras: {
    backgroundColor: '#bf615c',
    width: 50,
    height: 30,
    justifyContent: 'center',
    marginLeft: 30,
    marginTop: 10,
    borderRadius: 10
  },
  fabTxtAtras: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '200'
  },
})

export default AreaVer;