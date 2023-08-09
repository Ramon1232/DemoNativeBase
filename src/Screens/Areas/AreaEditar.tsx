import React, { useEffect, useState } from 'react'
import { Button, FlatList, Input, Text, TextArea, View, Flex, Box, HStack, Modal } from 'native-base'
import { AreaEditarScreenRouteProp, MainStackParamList } from '../../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { Alert, StyleSheet, Switch, TouchableOpacity } from 'react-native';

interface DataItem {
  areaId: number;
  main: string;
  second: string;
  thirth: string;
  description: string;
  active: boolean;
}

const AreaEditar = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {
  const [data, setData] = useState<DataItem[]>([]);
  const route = useRoute<AreaEditarScreenRouteProp>();
  const [editedData, setEditedData] = useState<DataItem | null>(null);

  useEffect(() => {
    getAreas();
  }, []);

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

  const deleteAreas = (areaId: number) => {
    axios.delete('http://192.168.1.70:3000/areas/' + route.params.areaId)
      .then(response => {
        Alert.alert('Eliminado correctamente')
        navigation.goBack();
      })
      .catch(error => {
        Alert.alert('Error al eliminar')
      })
      .finally(() => {

      });
  }

  const updateAreas = (item: DataItem) => {
    axios.patch('http://192.168.1.70:3000/areas/' + route.params.areaId, {
      main: item.main,
      second: item.second,
      thirth: item.thirth,
      description: item.description,
      active: item.active,
    })
      .then(response => {
        Alert.alert('Actualizado correctamente')
        navigation.goBack();
      })
      .catch(error => {
        Alert.alert('Error al actualizar')
      })
      .finally(() => {

      });
  }

  const renderDataItem = ({ item }: { item: DataItem }) => (
    <View flex={1}>
      {data.length > 0 && (
        <Flex direction="column" m={5}>
          <Text fontSize={'md'} fontWeight={'light'} mt={5}>ID del área</Text>
          <Input
            mt={2}
            value={item.areaId.toString()}
            size={'lg'}
            variant={'outline'}
            placeholder="areaId"
            fontWeight={'light'}
            editable={false}
          />
          <Text fontSize={'md'} fontWeight={'light'} mt={5}>Principal</Text>
          <Input
            mt={2}
            value={editedData ? editedData.main : item.main}
            size={'lg'}
            variant={'outline'}
            placeholder="Principal"
            fontWeight={'light'}
            onChangeText={text => {
              setEditedData({ ...item, main: text });
            }}
          />
          <Text fontSize={'md'} fontWeight={'light'} mt={5}>Secundario</Text>
          <Input
            mt={2}
            value={editedData ? editedData.second : item.second}
            size={'lg'}
            variant={'outline'}
            placeholder="Secundario"
            fontWeight={'light'}
            onChangeText={text => {
              setEditedData({ ...item, second: text });
            }}
          />
          <Text fontSize={'md'} fontWeight={'light'} mt={5}>Terciario</Text>
          <Input
            mt={2}
            value={editedData ? editedData.thirth : item.thirth}
            size={'lg'}
            variant={'outline'}
            placeholder="Terciario"
            fontWeight={'light'}
            onChangeText={text => {
              setEditedData({ ...item, thirth: text });
            }}
          />
          <Text fontSize={'md'} fontWeight={'light'} mt={'5'}>  Descripción</Text>
          <TextArea mt={2}
                    size={'lg'} 
                    value={editedData ? editedData.description : item.description} 
                    placeholder='Descripción' 
                    onChangeText={text => {
                      setEditedData({ ...item, description: text });
                    }}
                    />
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
          <HStack space={5} justifyContent='center'>
            <TouchableOpacity
              style={styles.fabLocationEliminar}
              onPress={() => deleteAreas(item.areaId)}>
              <View style={styles.fabEliminar}>
                <Text style={styles.fabTxt}>Eliminar</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fabLocation}
              onPress={() => updateAreas(editedData || item)}>
              <View style={styles.fab}>
                <Text style={styles.fabTxt}>Ok</Text>
              </View>
            </TouchableOpacity>
          </HStack>
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
  fabLocationEliminar: {
    marginTop: 50,
    alignSelf: 'center'
  },
  fabEliminar: {
    backgroundColor: '#eb3d34',
    width: 120,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center'
  },
})

export default AreaEditar;