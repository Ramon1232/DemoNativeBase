import React, { useEffect, useState } from 'react'
import { Button, FlatList, Input, Text, TextArea, View, Flex, Box, HStack, AlertDialog, useToast, Spinner, Heading } from 'native-base'
import { MainStackParamList, UbicacionesEditarScreenRouteProp } from '../../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { Alert, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import ResponsiveHeader from '../../components/ResponsiveHeader';
import Breadcrumb from '../../components/Breadcrumb';

interface DataItem {
  locationId: number;
  roomNumber: string;
  building: string;
  room: string;
  lockerNumber: string;
  locker: string;
  container: string;
  active: boolean;
}

const UbicacionesEditar = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {
  const [data, setData] = useState<DataItem[]>([]);
  const route = useRoute<UbicacionesEditarScreenRouteProp>();
  const [editedData] = useState<DataItem | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const cancelRef = React.useRef(null);
  const onClose = () => setIsOpen(false);
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = () => {
    setLoading(true);
    axios.get('http://158.97.121.147:3000/locations/' + route.params.locationId)
      // axios.get('http://159.97.121.147:3000/areas/' + route.params.areaId)
      .then((response) => {
        setData(response.data.locations);
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
    axios.delete('http://158.97.121.147:3000/locations/' + route.params.locationId)
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
    axios.patch('http://158.97.121.147:3000/locations/' + route.params.locationId, {
      // axios.patch('http:/159.97.121.147/:3000/areas/' + route.params.areaId, {
      roomNumber: item.roomNumber,
      building: item.building,
      room: item.room,
      lockerNumber: item.lockerNumber,
      locker: item.locker,
      container: item.container,
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
        getLocations();
        navigation.goBack();
      })
      .catch(error => {
        Alert.alert('Error al actualizar')
      })
      .finally(() => {

      });
  }

  const breadcrumbItems = [
    { label: 'Ubicaciones', onPress: () => navigation.goBack() },
    { label: 'Visualizar ubicación', onPress: () => navigation.goBack() },
    { label: 'Editar ubicación', onPress: () => getLocations() },
  ];

  const renderDataItem = ({ item }: { item: DataItem }) => (
    <View flex={1}>
      {data.length > 0 && (
        <Flex direction="column" m={5}>
          <Breadcrumb items={breadcrumbItems} />
          <Text fontSize={'md'} fontWeight={'light'} mt={5}>roomNumber:</Text>
          <Input
            mt={2}
            value={item.roomNumber}
            size={'lg'}
            variant={'outline'}
            placeholder="Principal"
            fontWeight={'light'}
            onChangeText={text => {
              setData([{ ...item, roomNumber: text }]);
            }}
          />
          <Text fontSize={'md'} fontWeight={'light'} mt={5}>Edificio:</Text>
          <Input
            mt={2}
            value={item.building}
            size={'lg'}
            variant={'outline'}
            placeholder="Secundario"
            fontWeight={'light'}
            onChangeText={text => {
              setData([{ ...item, building: text }]);
            }}
          />
          <Text fontSize={'md'} fontWeight={'light'} mt={5}>Nro. Cubiculo:</Text>
          <Input
            mt={2}
            value={item.room}
            size={'lg'}
            variant={'outline'}
            placeholder="Terciario"
            fontWeight={'light'}
            onChangeText={text => {
              setData([{ ...item, room: text }]);
            }}
          />
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
                    <Button colorScheme="danger" onPress={() => deleteAreas(item.locationId)}>
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
      <ResponsiveHeader
        navigation={navigation}
        title="Editar Ubicación"
        rightContent={<Text></Text>}
      />
      {loading ? (
        <HStack space={2} justifyContent="center" alignSelf={'center'} top={300}>
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            Loading...
          </Heading>
        </HStack>
      ) : (
        <FlatList
          data={data}
          renderItem={renderDataItem}
          keyExtractor={(item) => item.locationId.toString()}
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

export default UbicacionesEditar;