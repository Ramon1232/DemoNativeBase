import React, { useEffect, useState } from 'react'
import { Button, FlatList, Input, Text, TextArea, View, Flex, Box, HStack, AlertDialog, useToast, Spinner, Heading } from 'native-base'
import { AreaEditarScreenRouteProp, MainStackParamList } from '../../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { Alert, StyleSheet, Switch, TouchableOpacity } from 'react-native';
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

const AreaEditar = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {
  const [data, setData] = useState<DataItem[]>([]);
  const route = useRoute<AreaEditarScreenRouteProp>();
  const [editedData, setEditedData] = useState<DataItem | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef(null);
  const onClose = () => setIsOpen(false);
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAreas();
  }, []);

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
      const updatedData = data.map(item => ({ ...item, active: !item.active })); // Update all items in the array
      setData(updatedData);
      // Here you can also make a network request to update the "active" state on the server
    }
  }

  const deleteAreas = (areaId: number) => {
    axios.delete('http://192.168.1.70:3000/areas/' + route.params.areaId)
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

  const updateAreas = (item: DataItem) => {
    axios.patch('http://192.168.1.70:3000/areas/' + route.params.areaId, {
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
        getAreas();
        navigation.goBack();
      })
      .catch(error => {
        Alert.alert('Error al actualizar')
      })
      .finally(() => {

      });
  }

  const breadcrumbItems = [
    { label: 'Áreas', onPress: () => navigation.goBack() },
    { label: 'Visualizar áreas', onPress: () => navigation.goBack() },
    { label: 'Editar áreas', onPress: () => getAreas() },

  ];

  const renderDataItem = ({ item }: { item: DataItem }) => (
    <View flex={1}>
      <ResponsiveHeader
        navigation={navigation}
        title="Editar área"
        rightContent={<Text></Text>}
      />
      {data.length > 0 && (
        <Flex direction="column" m={5}>
          <Breadcrumb items={breadcrumbItems} />
          <Text fontSize={'md'} fontWeight={'light'} mt={5}>Editar área principal:</Text>
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
          <Text fontSize={'md'} fontWeight={'light'} mt={5}>Editar área secundaria:</Text>
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
          <Text fontSize={'md'} fontWeight={'light'} mt={5}>Editar área terciaria:</Text>
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
          <Text fontSize={'md'} fontWeight={'light'} mt={'5'}> Editar Descripción:</Text>
          <TextArea mt={2}
            size={'lg'}
            value={editedData ? editedData.description : item.description}
            placeholder='Descripción'
            onChangeText={text => {
              setEditedData({ ...item, description: text });
            }}
            autoCompleteType={undefined} />
          <Text mt={4} fontSize={'md'} fontWeight={'light'}>Cambiar estado del área:</Text>
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
                    <Button colorScheme="danger" onPress={() => deleteAreas(item.areaId)}>
                      Aceptar
                    </Button>
                  </Button.Group>
                </AlertDialog.Footer>
              </AlertDialog.Content>
            </AlertDialog>
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
    padding: 1
  },
})

export default AreaEditar;