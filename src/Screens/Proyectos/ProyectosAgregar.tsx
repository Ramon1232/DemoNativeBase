import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Alert, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Flex, HStack, Input, Text, TextArea, View, Box, Select, ScrollView } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import ResponsiveHeader from '../../components/ResponsiveHeader';
import Breadcrumb from '../../components/Breadcrumb';

interface PostData {
  name: string;
  description: string;
  active: boolean;
}

interface DataItem {
  projectId: number;
  customerId: number;
  accountId: number;
  name: string;
  active: boolean;
  customers: any;
}

const ProyectosAgregar = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {
  const [name, setName] = useState('');
  const [second, setSecond] = useState('');
  const [thirth, setThirth] = useState('');
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(false);
  const [selectOptions, setSelectOptions] = useState<string[]>([]);
  const [data, setData] = useState<DataItem[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchSelectOptions();
  }, []);

  const toggleSwitch = () => {
    setActive(previousState => !previousState);
  };

  const postProjects = () => {
    const postData: PostData = {
      name,
      description,
      active,
    };
    axios.post('http://158.97.121.147:3000/projects/', postData)
      .then((response) => {
        console.log('Área creada exitosamente:', response.data);
        navigation.goBack(); // Vuelve a la pantalla anterior
      })
      .catch((error) => {
        console.error('Error al crear el área:', error);
        // Aquí puedes mostrar un mensaje de error o manejar el error de alguna otra manera
      })
      .finally(() => {

      });
  }

  const fetchSelectOptions = () => {
    axios.get('http://158.97.121.147:3000/projects')
      .then((response) => {
        setData(response.data.projects);
        const clientNames = response.data.projects.map((project: any) => project.customers.contacts.name);
        setSelectOptions(clientNames);
      })
      .catch((error) => {
        console.error('Error al obtener las opciones del select:', error);
      });
  };

  const breadcrumbItems = [
    { label: 'Proyectos', onPress: () => navigation.goBack() },
    { label: 'Agregar Proyectos', onPress: () => navigation.navigate('ProyectosAgregar') }
  ];

  const handleSelectChange = (selectedValue: string) => {
    setSearchText(selectedValue);
  };

  return (
    <View flex={1}>
      <ResponsiveHeader
        navigation={navigation}
        title="Agregar proyecto"
        rightContent={<Text>Actualizar</Text>}
      />
      <ScrollView>
        <Flex direction='column' m={5}>
          <Breadcrumb items={breadcrumbItems} />
          <Text mt={5} mb={2} fontWeight={300}>Seleccione cliente interno</Text>
          <Select
            selectedValue={searchText}
            onValueChange={handleSelectChange}
            size={'lg'}
            fontWeight={'light'}
            variant={'outline'}
          >
            <Select.Item label="Seleccione un cliente" value="" />
            {selectOptions.map(option => (
              <Select.Item key={option} label={option} value={option} />
            ))}
          </Select>
          <Text mt={4} mb={2} fontWeight={300}>Nombre del proyecto*</Text>
          <Input
            size={'lg'}
            fontWeight={'light'}
            variant={'outline'}
            placeholder='Ej. "Coordinación"'
            value={name}
            onChangeText={setName}
          />
          <Text mt={4}
            mb={2}
            fontWeight={300}>
            Descripción del proyecto
          </Text>
          <TextArea
            size={'lg'}
            fontWeight={'light'}
            placeholder='Ej. "Breve descripción"'
            value={description}
            onChangeText={setDescription}
            autoCompleteType={undefined}
          />
          <Text mt={4} mb={2} fontWeight={300}>Nro. de cuenta</Text>
          <Input
            size={'lg'}
            fontWeight={'light'}
            variant={'outline'}
            placeholder='Ej. "Nro de cuenta"'
            value={second}
            onChangeText={setSecond}
          />
          <Text mt={4} mb={2} fontWeight={300}>Nombre de la cuenta</Text>
          <Input
            size={'lg'}
            fontWeight={'light'}
            variant={'outline'}
            placeholder='Ej. "ing..."'
            value={thirth}
            onChangeText={setThirth}
          />
          <Text mt={4} mb={2} fontWeight={300}>Descripción</Text>
          <Input
            size={'lg'}
            fontWeight={'light'}
            variant={'outline'}
            placeholder=''
            value={thirth}
            onChangeText={setThirth}
          />
          <Text mt={4} mb={1}
            fontWeight={300}>Estado</Text>
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
            <TouchableOpacity style={styles.fabLocation} onPress={postProjects}>
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

export default ProyectosAgregar;