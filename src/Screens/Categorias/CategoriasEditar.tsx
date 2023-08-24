import React, { useEffect, useState } from 'react'
import { Button, FlatList, Input, Text, TextArea, View, Flex, Box, HStack, AlertDialog, useToast, Spinner, Heading } from 'native-base'
import { CategoriasEditarScreenRouteProp, MainStackParamList } from '../../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { Alert, StyleSheet, Switch, TouchableOpacity } from 'react-native';
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

const CategoriasEditar = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {
  const [data, setData] = useState<DataItem[]>([]);
  const route = useRoute<CategoriasEditarScreenRouteProp>();
  const [editedData] = useState<DataItem | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef(null);
  const onClose = () => setIsOpen(false);
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories();
  }, []);

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
      const updatedData = data.map(item => ({ ...item, active: !item.active })); // Update all items in the array
      setData(updatedData);
      // Here you can also make a network request to update the "active" state on the server
    }
  }

  const deleteCategories = (areaId: number) => {
    axios.delete('http://158.97.121.147:3000/categories/' + route.params.categoryId)
    // axios.delete('http://159.97.121.147:3000/areas/' + route.params.areaId)
      .then(response => {
        navigation.goBack();
        navigation.goBack();
      })
      .catch(error => {
        Alert.alert('Error al eliminar')
      })
      .finally(() => {

      });
  }

  const updateCategories = (item: DataItem) => {
    axios.patch('http://158.97.121.147:3000/categories/' + route.params.categoryId, {
      // axios.patch('http:/159.97.121.147/:3000/areas/' + route.params.areaId, {
        main: item.main,
        second: item.second,
        thirth: item.thirth,
        description: item.description,
        active: item.active,
    })
      .then(response => {
        toast.show({
          title: "Exito al actualizar",
          variant: "solid",
          description: "Los datos se han actualizado",
          placement: 'bottom',
          backgroundColor: '#193250',
          duration: 1500,
        })
        getCategories();
        navigation.goBack();
      })
      .catch(error => {
        Alert.alert('Error al actualizar')
      })
      .finally(() => {

      });
  }

  const breadcrumbItems = [
    { label: 'Categorias', onPress: () => navigation.goBack() },
    { label: 'Visualizar categoria', onPress: () => navigation.goBack() },
    { label: 'Editar categoria', onPress: () => getCategories() },
  ];

  const renderDataItem = ({ item }: { item: DataItem }) => (
    <View flex={1}>
      <ResponsiveHeader
        navigation={navigation}
        title="Editar categoria"
        rightContent={<Text></Text>}
      />
      {data.length > 0 && (
        <Flex direction="column" m={5}>
          <Breadcrumb items={breadcrumbItems} />
          <Text fontSize={'md'} fontWeight={'light'} mt={5}>Categoria principal:</Text>
          <Input
            mt={2}
            value={item.main}
            size={'lg'}
            variant={'outline'}
            placeholder="Principal"
            fontWeight={'light'}
            onChangeText={text => {
              setData([{ ...item, main: text }]);
            }}
          />
          <Text fontSize={'md'} fontWeight={'light'} mt={5}>Categoria secundaria:</Text>
          <Input
            mt={2}
            value={item.second}
            size={'lg'}
            variant={'outline'}
            placeholder="Secundario"
            fontWeight={'light'}
            onChangeText={text => {
              setData([{ ...item, second: text }]);
            }}
          />
          <Text fontSize={'md'} fontWeight={'light'} mt={5}>Categoria terciaria:</Text>
          <Input
            mt={2}
            value={item.thirth}
            size={'lg'}
            variant={'outline'}
            placeholder="Terciario"
            fontWeight={'light'}
            onChangeText={text => {
              setData([{ ...item, thirth: text }]);
            }}
          />
          <Text fontSize={'md'} fontWeight={'light'} mt={'5'}> Descripción:</Text>
          <TextArea mt={2}
            size={'lg'}
            value={item.description}
            placeholder='Descripción'
            onChangeText={text => {
              setData([{ ...item, description: text }]);
            }}
            autoCompleteType={undefined} />
          <Text mt={4} fontSize={'md'} fontWeight={'light'}>Cambiar estado:</Text>
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
          <HStack mt={10} space={5} justifyContent='center'>
            <Button borderRadius={10} w={120} h={60} colorScheme="danger" onPress={() => setIsOpen(!isOpen)}>
              Eliminar
            </Button>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
              <AlertDialog.Content>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>Eliminar Área</AlertDialog.Header>
                <AlertDialog.Body>
                  ¿Estas seguro de eliminar esta área?
                  Esta acción no se puede revertir.
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button.Group space={2}>
                    <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                      Cancelar
                    </Button>
                    <Button colorScheme="danger" onPress={() => deleteCategories(item.categoryId)}>
                      Aceptar
                    </Button>
                  </Button.Group>
                </AlertDialog.Footer>
              </AlertDialog.Content>
            </AlertDialog>
            <TouchableOpacity
              style={styles.fabLocation}
              onPress={() => updateCategories(editedData || item)}>
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
    padding: 1
  },
})

export default CategoriasEditar;