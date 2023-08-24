import React, { useState } from 'react'
import axios from 'axios';
import { Alert, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Flex, HStack, Input, Text, TextArea, View, Box } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import ResponsiveHeader from '../../components/ResponsiveHeader';
import Breadcrumb from '../../components/Breadcrumb';

interface PostData {
  main: string;
  second: string;
  thirth: string;
  description: string;
  active: boolean;
}

const CategoriasAgregar = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {
  const [main, setMain] = useState('');
  const [second, setSecond] = useState('');
  const [thirth, setThirth] = useState('');
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(false);

  const toggleSwitch = () => {
    setActive(previousState => !previousState);
  };

  const postCategories = () => {
    const postData: PostData = {
      main,
      second,
      thirth,
      description,
      active,
    };
    axios.post('http://158.97.121.147:3000/categories/', postData)
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
    { label: 'Categorias', onPress: () => navigation.goBack() },
    { label: 'Agregar categorias', onPress: () => navigation.navigate('CategoriasAgregar')}
  ];

  return (
    <View flex={1}>
      <ResponsiveHeader
        navigation={navigation}
        title="Agregar categorias"
        rightContent={<Text>Actualizar</Text>}
      />
      <Flex direction='column' m={5}>
        <Breadcrumb items={breadcrumbItems} />
        <Text mt={4} mb={2} fontWeight={300}>Categoria principal*</Text>
        <Input
          size={'lg'}
          fontWeight={'light'}
          variant={'outline'}
          placeholder='Ej. "Coordinación"'
          value={main}
          onChangeText={setMain}
        />
        <Text mt={4} mb={2} fontWeight={300}>Categoria secundaria</Text>
        <Input
          size={'lg'}
          fontWeight={'light'}
          variant={'outline'}
          placeholder='Ej. "Administración"'
          value={second}
          onChangeText={setSecond}
        />
        <Text mt={4} mb={2} fontWeight={300}>Categoria Terciaria</Text>
        <Input
          size={'lg'}
          fontWeight={'light'}
          variant={'outline'}
          placeholder='Ej. "laboratorios"'
          value={thirth}
          onChangeText={setThirth}
        />
        <Text mt={4}
          mb={2}
          fontWeight={300}>
          Descripción de la categoria
        </Text>
        <TextArea
          size={'lg'}
          fontWeight={'light'}
          placeholder='Ej. "Breve descripción del área asignada"'
          value={description}
          onChangeText={setDescription}
          autoCompleteType={undefined}
        />
        <Text mt={4} mb={1}
          fontWeight={300}>Estado de la categoria</Text>
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

export default CategoriasAgregar;