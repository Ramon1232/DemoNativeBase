import React, { useEffect, useState } from 'react'
import { Button, FlatList, Input, Text, TextArea, View, Flex, Box, HStack, ScrollView, Spinner, Heading } from 'native-base'
import { CategoriasVerScreenRouteProp, MainStackParamList } from '../../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { RefreshControl, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import ResponsiveHeader from '../../components/ResponsiveHeader';
import Breadcrumb from '../../components/Breadcrumb';

interface DataItem {
  categoryId: number;
  main: string;
  second: string;
  thirth: string;
  description: string;
  active: boolean;
}

const CategoriasVer = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {
  const [data, setData] = useState<DataItem[]>([]);
  const route = useRoute<CategoriasVerScreenRouteProp>();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const onRefresh = () => {
    setRefreshing(true);
    getCategories();
    setRefreshing(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const editCategories = (categoryId: number) => {
    navigation.navigate('CategoriasEditar', { categoryId: categoryId });
  }

  const getCategories = () => {
    setLoading(true);
    axios.get('http://158.97.121.147:3000/categories/' + route.params.categoryId)
    // axios.get('http://159.97.121.147:3000/areas/' + route.params.areaId)
      .then((response) => {
        setData(response.data.categories);
      })
      .catch((error) => {
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const toggleSwitch = () => {
    if (data.length > 0) {
      const updatedData = data.map(item => ({ ...item, active: !item.active }));
      setData(updatedData);
    }
  }

  const breadcrumbItems = [
    { label: 'Categorias', onPress: () => navigation.goBack() },
    { label: 'Visualizar categoria', onPress: () => getCategories() },
    { label: 'Editar categoria', onPress: () => navigation.navigate('AreaEditar', { areaId: route.params.categoryId}) },
  ];

  const renderDataItem = ({ item }: { item: DataItem }) => (
    <ScrollView
      flex={1}
      refreshControl={ // Agregar esta línea
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <ResponsiveHeader
        navigation={navigation}
        title="Visualizar categoria"
        rightContent={<Text>Actualizar</Text>}
      />
      {data.length > 0 && (
        <Flex direction="column" m={5}>
          <Breadcrumb items={breadcrumbItems} />
          <Text fontSize={'md'} fontWeight={'light'} mt={5}>Principal:</Text>
          <Input
            value={item.main}
            size={'lg'}
            variant={'underlined'}
            placeholder="Principal"
            editable={false}
            fontWeight={'light'}
          />
          <Text fontSize={'md'} fontWeight={'light'} mt={5}>Secundario:</Text>
          <Input
            value={item.second}
            size={'lg'}
            variant={'underlined'}
            placeholder="Secundario"
            editable={false}
            fontWeight={'light'}
          />
          <Text fontSize={'md'} fontWeight={'light'} mt={5}>Terciario:</Text>
          <Input
            value={item.thirth}
            size={'lg'}
            variant={'underlined'}
            placeholder="Terciario"
            editable={false}
            fontWeight={'light'}
          />
          <Text fontSize={'md'} fontWeight={'light'} mt={'5'}>  Descripción:</Text>
          <TextArea mt={2.5} size={'lg'} value={item.description} placeholder='Descripción' editable={false} autoCompleteType={undefined} />
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
          <HStack space={5} justifyContent={'center'}>
            <TouchableOpacity
              style={styles.fabLocation}
              onPress={() => navigation.goBack()}>
              <View style={styles.fab}>
                <Text style={styles.fabTxt}>Cancelar</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fabLocation}
              onPress={() => editCategories(item.categoryId)}
              >
              <View style={styles.fab}>
                <Text style={styles.fabTxt}>Editar</Text>
              </View>
            </TouchableOpacity>
          </HStack>
        </Flex>
      )}
    </ScrollView>

  );
  return (
    <View flex={1}>
      {loading ? (
        <HStack space={2} justifyContent="center" alignSelf={'center'} top={300}>
          <Spinner accessibilityLabel="Loading posts"/>
          <Heading color="primary.500" fontSize="md">
            Loading...
          </Heading>
        </HStack>
      ) : (
        <FlatList
          data={data}
          renderItem={renderDataItem}
          keyExtractor={(item) => item.categoryId.toString()}
        />
      )}
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
})

export default CategoriasVer;