import React, { useEffect, useState } from 'react'
import { Button, FlatList, Input, Text, TextArea, View, Flex, Box, HStack, ScrollView, Spinner, Heading } from 'native-base'
import { AreaVerScreenRouteProp, MainStackParamList } from '../../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { RefreshControl, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import ResponsiveHeader from '../../components/ResponsiveHeader';
import Breadcrumb from '../../components/Breadcrumb';

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
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const onRefresh = () => {
    setRefreshing(true);
    getAreas();
    setRefreshing(false);
  };

  useEffect(() => {
    getAreas();
  }, []);

  const editArea = (areaId: number) => {
    navigation.navigate('AreaEditar', { areaId: areaId });
  }

  const getAreas = () => {
    setLoading(true);
    axios.get('http://192.168.1.70:3000/areas/' + route.params.areaId)
    // axios.get('http://159.97.121.147:3000/areas/' + route.params.areaId)
      .then((response) => {
        setData(response.data.areas);
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
    { label: 'Áreas', onPress: () => navigation.goBack() },
    { label: 'Visualizar áreas', onPress: () => getAreas() },
    { label: 'Editar áreas', onPress: () => navigation.navigate('AreaEditar', { areaId: route.params.areaId }) },
  ];

  const renderDataItem = ({ item }: { item: DataItem }) => (
    <ScrollView
      flex={1}
      refreshControl={ // Agregar esta línea
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <ResponsiveHeader
        navigation={navigation}
        title="Visualizar área"
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
              onPress={() => editArea(item.areaId)}>
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
          keyExtractor={(item) => item.areaId.toString()}
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

export default AreaVer;