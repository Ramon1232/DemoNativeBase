import { TouchableOpacity, StyleSheet, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import MainHeader from '../../components/MainHeader';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { Flex, View, Input, Text, Box, FlatList, Select } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface DataItem {
  projectId: number;
  customerId: number;
  accountId: number;
  name: string;
  active: boolean;
  customers: any;
}

const Proyectos = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {

  const [data, setData] = useState<DataItem[]>([]);
  const [searchText, setSearchText] = useState('');
  const [active, setActive] = React.useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [selectOptions, setSelectOptions] = useState<string[]>([]);

  const onRefresh = () => {
    setRefreshing(true);
    getProjects();
    setRefreshing(false);
  };

  useEffect(() => {
    getProjects();
    fetchSelectOptions();
  }, []);

  const renderRow = ({ item }: { item: DataItem }) => (
    <TouchableOpacity onPress={() => verProjects(item.projectId)}>
      <View style={styles.row}>
        <Text style={[styles.cell, styles.idCell]}>{item.projectId}</Text>
        <Text style={[styles.cell, styles.projectCell]}>{item.name}</Text>
        {/* <Text style={[styles.cell, styles.buildingCell]}>{[item.building, item.room].join(" / ")}</Text> */}
        <MaterialIcons style={[styles.checkCell, styles.stateCell]} name={item.active ? 'check-box' : 'check-box-outline-blank'} size={24} color={'black'}/>
        {/* <Text style={[styles.cell, styles.stateCell]}>{item.active ? 'Activo' : 'Inactivo'}</Text> */}
      </View>
    </TouchableOpacity>
  );

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) &&
    (!active || item.active === (active === "true"))
  );

  const getProjects = () => {
    axios.get('http://192.168.1.70:3000/projects')
      // axios.get('http://159.97.121.147:3000/areas/')
      .then((response) => {
        setData(response.data.projects);
        const clientNames = response.data.projects.map((project: any) => project.customers.contacts.name);
        setSelectOptions(clientNames);
        setError(false);
      })
      .catch((error) => {
        setError(true);
      })
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

  const verProjects = (projectId: number) => {
    navigation.navigate('ProyectosVer', { projectId: projectId });
  }

  const handleSelectChange = (selectedValue: string) => {
    setSearchText(selectedValue);
  };

  // DISEÑO DE LA PAGINA -------------------------------------------------

  return (
    <View flex={1}>
      <MainHeader
        navigation={navigation}
        title="Proyectos"
        onRefresh={getProjects}
      />
      <Flex direction='column' m={5}>
        <Text mb={2} fontWeight={300}>Buscar por cliente interno</Text>
        <Select
          selectedValue={searchText}
          onValueChange={handleSelectChange}
          size={'lg'}
          fontWeight={'light'}
          variant={'outline'}
        >
          <Select.Item label="Seleccione un contacto" value="" />
          {selectOptions.map(option => (
            <Select.Item key={option} label={option} value={option} />
          ))}
        </Select>
      </Flex>
      {/* Tabla para visualizar la api getCategories */}

      <Box flex={1} maxH={'75%'}>
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, styles.idCell]}>Id</Text>
          <Text style={[styles.headerCell, styles.projectCell]}>Proyecto</Text>
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
            keyExtractor={(item) => item.projectId.toString()}
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
        onPress={() => navigation.navigate('ProyectosAgregar')}>
        <View style={styles.fab}>
          <AntDesign name='plus' size={28} color={'white'} style={styles.fabTxt} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Proyectos;

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
  projectCell: {
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