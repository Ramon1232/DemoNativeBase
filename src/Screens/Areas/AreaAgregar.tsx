import React, { useState } from 'react'
import axios from 'axios';
import { Alert, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Flex, HStack, Input, Text, TextArea, View, Box } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';

interface PostData {
  main: string;
  second: string;
  thirth: string;
  description: string;
  active: boolean;
}

const AreaAgregar = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {
  const [main, setMain] = useState('');
  const [second, setSecond] = useState('');
  const [thirth, setThirth] = useState('');
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(false);

  const toggleSwitch = () => {
    setActive(previousState => !previousState);
  };

  const handlePost = async () => {
    const postData = {
      main,
      second,
      thirth,
      description,
      active,
    };

    try {
      const response = await axios.post('http://192.168.1.70:3000/areas', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        // Si la respuesta es exitosa, mostrar un mensaje de éxito
        Alert.alert('Post creado exitosamente');
        // Restablecer los valores de los campos de entrada
        setMain('');
        setSecond('');
        setThirth('');
        setDescription('');
        setActive(false);
        navigation.goBack();
      } else {
        // Si la respuesta no es exitosa, mostrar un mensaje de error
        Alert.alert('Error al crear el post');
      }
    } catch (error) {
      // En caso de error en la solicitud, mostrar un mensaje de error
      Alert.alert('Error al realizar la solicitud');
    }
  };

  return (
    <View flex={1}>
      <Flex direction='column' m={5}>
        <Input
          mt={5}
          size={'lg'}
          fontWeight={'light'}
          variant={'outline'}
          placeholder='Introduce el área principal'
          value={main}
          onChangeText={setMain}
        />
        <Input
          mt={5}
          size={'lg'}
          fontWeight={'light'}
          variant={'outline'}
          placeholder='Introduce el área secundaria'
          value={second}
          onChangeText={setSecond}
        />
        <Input
          mt={5}
          size={'lg'}
          fontWeight={'light'}
          variant={'outline'}
          placeholder='Introduce el área Terciaria'
          value={thirth}
          onChangeText={setThirth}
        />
        <TextArea
          mt={5}
          size={'lg'}
          fontWeight={'light'}
          placeholder='Descripción del área'
          value={description}
          onChangeText={setDescription}
        />
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
        <TouchableOpacity style={styles.fabLocation} onPress={handlePost}>
          <View style={styles.fab}>
            <Text style={styles.fabTxt}>Agregar Área</Text>
          </View>
        </TouchableOpacity>
      </Flex>
    </View>
  )
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#193250',
    width: 150,
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

export default AreaAgregar;