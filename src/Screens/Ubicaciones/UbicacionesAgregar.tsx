import React, { useState } from 'react'
import axios from 'axios';
import { Alert, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Flex, HStack, Input, Text, TextArea, View, Box, ScrollView } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import ResponsiveHeader from '../../components/ResponsiveHeader';
import Breadcrumb from '../../components/Breadcrumb';

interface PostData {
  roomNumber: string;
  building: string;
  room: string;
  lockerNumber: string;
  locker: string;
  container: string;
  active: boolean;
}

const UbicacionesAgregar = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {
  const [roomNumber, setRoomNumber] = useState('');
  const [building, setBuilding] = useState('');
  const [room, setRoom] = useState('');
  const [lockerNumber, setLockerNumber] = useState('');
  const [locker, setLocker] = useState('');
  const [container, setContainer] = useState('');
  const [active, setActive] = useState(false);

  const toggleSwitch = () => {
    setActive(previousState => !previousState);
  };

  const postCategories = () => {
    const postData: PostData = {
      roomNumber,
      building,
      room,
      lockerNumber,
      locker,
      container,
      active,
    };
    axios.post('http://158.97.121.147:3000/locations/', postData)
      .then((response) => {
        console.log('Área creada exitosamente:', response.data);
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Error al crear el área:', error);
        // Aquí puedes mostrar un mensaje de error o manejar el error de alguna otra manera
      })
      .finally(() => {

      });
  }

  const breadcrumbItems = [
    { label: 'Ubicaciones', onPress: () => navigation.goBack() },
    { label: 'Agregar ubicaciones', onPress: () => navigation.navigate('UbicacionesAgregar') }
  ];

  return (
    <View flex={1}>
      <ResponsiveHeader
        navigation={navigation}
        title="Agregar Ubicaciones"
        rightContent={<Text>Actualizar</Text>}
      />
      <ScrollView>
        <Flex direction='column' m={5}>
          <Breadcrumb items={breadcrumbItems} />
          <Text mt={4} mb={2} fontWeight={300}>room Number*</Text>
          <Input
            size={'lg'}
            fontWeight={'light'}
            variant={'outline'}
            placeholder='Ej. "Principal"'
            value={roomNumber}
            onChangeText={setRoomNumber}
          />
          <Text mt={4} mb={2} fontWeight={300}>building*</Text>
          <Input
            size={'lg'}
            fontWeight={'light'}
            variant={'outline'}
            placeholder='Ej. "Administración"'
            value={building}
            onChangeText={setBuilding}
          />
          <Text mt={4} mb={2} fontWeight={300}>room*</Text>
          <Input
            size={'lg'}
            fontWeight={'light'}
            variant={'outline'}
            placeholder='Ej. "laboratorios"'
            value={room}
            onChangeText={setRoom}
          />
          <Text mt={4} mb={2} fontWeight={300}>Categoria Terciaria</Text>
          <Input
            size={'lg'}
            fontWeight={'light'}
            variant={'outline'}
            placeholder='Ej. "laboratorios"'
            value={lockerNumber}
            onChangeText={setLockerNumber}
          />
          <Text mt={4} mb={2} fontWeight={300}>locker</Text>
          <Input
            size={'lg'}
            fontWeight={'light'}
            variant={'outline'}
            placeholder='Ej. "laboratorios"'
            value={locker}
            onChangeText={setLocker}
          />
          <Text mt={4} mb={2} fontWeight={300}>container</Text>
          <Input
            size={'lg'}
            fontWeight={'light'}
            variant={'outline'}
            placeholder='Ej. "laboratorios"'
            value={container}
            onChangeText={setContainer}
          />
          <Text mt={4} mb={1}
            fontWeight={300}>Estado de la ubicación</Text>
          <HStack space={3} justifyContent='flex-start'>
            <Box mt={5} ml={-4} maxH={'10'} maxW={'60'} w={'60'} justifyContent={'center'}>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={active ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={active}
                style={{ left: 0 }}
              />
            </Box>
            <Box mt={5} maxH={'10'} maxW={'20'}>
              <Text mt={'2'} size={'lg'} fontWeight={'light'}>
                {active ? 'Activado' : 'Inactivo'}
              </Text>
            </Box>
          </HStack>
          <HStack mt={5} space={5} justifyContent={'center'}>
            <TouchableOpacity style={styles.fabLocation} onPress={() => navigation.goBack()}>
              <View style={styles.fab}>
                <Text style={styles.fabTxt}>Cancelar</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabLocation} onPress={postCategories}>
              <View style={styles.fab}>
                <Text style={styles.fabTxt}>Agregar</Text>
              </View>
            </TouchableOpacity>
          </HStack>
        </Flex>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#193250',
    width: 120,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
  },
  fabTxt: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '200',
  },
  fabLocation: {
    marginTop: 30,
    alignSelf: 'center',
  },
});

export default UbicacionesAgregar;