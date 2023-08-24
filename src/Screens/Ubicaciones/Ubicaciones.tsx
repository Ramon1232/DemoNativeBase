import { Alert, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainHeader from '../../components/MainHeader';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { Flex, View, Input, Text, Box, FlatList } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface DataItem {
  locationId: number;
  roomNumber: string;
  building: string;
  room: string;
  active: boolean;
}

const Ubicaciones = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {

  const [data, setData] = useState<DataItem[]>([]);
  const [searchText, setSearchText] = useState('');
  const [active, setActive] = React.useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    getLocations();
    setRefreshing(false);
  };

  useEffect(() => {
    getLocations();
  }, []);

  const renderRow = ({ item }: { item: DataItem }) => (
    <TouchableOpacity onPress={() => verUbicaciones(item.locationId)}>
      <View style={styles.row}>
        <Text style={[styles.cell, styles.idCell]}>{item.locationId}</Text>
        <Text style={[styles.cell, styles.idCell]}>{item.roomNumber}</Text>
        <Text style={[styles.cell, styles.buildingCell]}>{[item.building, item.room].join(" / ")}</Text>
        <MaterialIcons style={[styles.checkCell, styles.stateCell]} name={item.active ? 'check-box' : 'check-box-outline-blank'} size={24} color={'black'}/>
        {/* <Text style={[styles.cell, styles.stateCell]}>{item.active ? 'Activo' : 'Inactivo'}</Text> */}
      </View>
    </TouchableOpacity>
  );

  const filteredData = data.filter(item =>
    item.building.toLowerCase().includes(searchText.toLowerCase()) &&
    (!active || item.active === (active === "true"))
  );

  const getLocations = () => {
    axios.get('http://158.97.121.147:3000/locations')
      // axios.get('http://159.97.121.147:3000/areas/')
      .then((response) => {
        setData(response.data.locations);
        setError(false);
      })
      .catch((error) => {
        setError(true);
      })
  }

  const verUbicaciones = (locationId: number) => {
     navigation.navigate('UbicacionesVer', { locationId: locationId });
  }

  // DISEÑO DE LA PAGINA -------------------------------------------------

  return (
    <View flex={1}>
      <MainHeader
        navigation={navigation}
        title="Ubicaciones"
        onRefresh={getLocations}
      />
      <Flex direction='column' m={5}>
        <Text mb={2} fontWeight={300}>Buscar por ubicación</Text>
        <Input size={'lg'}
          variant={'outline'}
          placeholder='Ej. "Principal"'
          fontWeight={'light'}
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </Flex>
      {/* Tabla para visualizar la api getCategories */}

      <Box flex={1} maxH={'75%'}>
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, styles.idCell]}>Id</Text>
          <Text style={[styles.headerCell, styles.idCell]}>Nro.</Text>
          <Text style={[styles.headerCell, styles.buildingCell]}>Ubicación</Text>
          <Text style={[styles.headerCell, styles.stateCell]}>Estado</Text>
        </View>
        {error ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No hay conexión a internet.</Text>
            <Feather name='wifi-off' size={28} color={'black'} style={styles.noDataIcon} />
          </View>
        ) : data.length > 0 ? (
          <FlatList
            data={filteredData}
            renderItem={renderRow}
            keyExtractor={(item) => item.locationId.toString()}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        ) : (
          <View>
            <Text style={styles.noDataText}>No hay datos disponibles, {'\n'}
            </Text>
            <Feather name='frown' size={28} color={'black'} style={styles.noDataIcon} />
          </View>
        )}
      </Box>
      <TouchableOpacity
        style={styles.fabLocation}
        onPress={() => navigation.navigate('UbicacionesAgregar')}>
        <View style={styles.fab}>
          <AntDesign name='plus' size={28} color={'white'} style={styles.fabTxt} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Ubicaciones;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  cell: {
    flex: 1,
    color: 'black',
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 10,
  },
  idCell: {
    flex: 0.3,
    textAlign: 'center'
  },
  buildingCell: {
    flex: 1,
  },
  checkCell: {
    flex: 1,
    marginBottom: 10,
  },
  stateCell: {
    flex: 0.4,
    textAlign: 'center'
  },
  fab: {
    backgroundColor: '#193250',
    width: 80,
    height: 80,
    borderRadius: 100,
    justifyContent: 'center'
  },
  fabTxt: {
    alignSelf: 'center',
  },
  fabLocation: {
    position: 'absolute',
    bottom: 10,
    right: 20
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    fontWeight: '300',
  },
  noDataIcon: {
    marginTop: 10,
    alignSelf: 'center',
  },
})