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
  categoryId: number;
  main: string;
  second: string;
  thirth: string;
  active: boolean;
}

const Categorias = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {

  const [data, setData] = useState<DataItem[]>([]);
  const [searchText, setSearchText] = useState('');
  const [active, setActive] = React.useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    getCategories();
    setRefreshing(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const renderRow = ({ item }: { item: DataItem }) => (
    <TouchableOpacity onPress={() => verCategories(item.categoryId)}>
      <View style={styles.row}>
        <Text style={[styles.cell, styles.idCell]}>{item.categoryId}</Text>
        <Text style={[styles.cell, styles.mainCell]}>{[item.main, item.second, item.thirth].join(" / ")}</Text>
        <MaterialIcons style={[styles.checkCell, styles.stateCell]} name={item.active ? 'check-box' : 'check-box-outline-blank'} size={24} color={'black'} />
        {/* <Text style={[styles.cell, styles.stateCell]}>{item.active ? 'Activo' : 'Inactivo'}</Text> */}
      </View>
    </TouchableOpacity>
  );

  const filteredData = data.filter(item =>
    item.main.toLowerCase().includes(searchText.toLowerCase()) &&
    (!active || item.active === (active === "true"))
  );

  const getCategories = () => {
    axios.get('http://158.97.121.147:3000/categories')
      // axios.get('http://159.97.121.147:3000/areas/')
      .then((response) => {
        setData(response.data.categories);
        setError(false);
      })
      .catch((error) => {
        setError(true);
      })
  }

  const verCategories = (categoryId: number) => {
    navigation.navigate('CategoriasVer', { categoryId: categoryId });
  }

  // DISEÑO DE LA PAGINA -------------------------------------------------

  return (
    <View flex={1}>
      <MainHeader
        navigation={navigation}
        title="Categorias"
        onRefresh={getCategories}
      />
      <Flex direction='column' m={5}>
        <Text mb={2} fontWeight={300}>Buscar por categoria principal</Text>
        <Input size={'lg'}
          variant={'outline'}
          placeholder='Ej. "Coordinación"'
          fontWeight={'light'}
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
        <Text mb={2} fontWeight={300}>Buscar por categoria secundaria</Text>
        <Input size={'lg'}
          variant={'outline'}
          placeholder='Ej. "Coordinación"'
          fontWeight={'light'}
        // value={searchText}
        // onChangeText={text => setSearchText(text)} 
        />
        <Text mb={2} fontWeight={300}>Buscar por categoria terciaria</Text>
        <Input size={'lg'}
          variant={'outline'}
          placeholder='Ej. "Coordinación"'
          fontWeight={'light'}
        // value={searchText}
        // onChangeText={text => setSearchText(text)} 
        />
      </Flex>
      {/* Tabla para visualizar la api getCategories */}

      <Box flex={1} maxH={'60%'} mb={20}>
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, styles.idCell]}>Id</Text>
          <Text style={[styles.headerCell, styles.mainCell]}>Categorias</Text>
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
            keyExtractor={(item) => item.categoryId.toString()}
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
        onPress={() => navigation.navigate('CategoriasAgregar')}>
        <View style={styles.fab}>
          <AntDesign name='plus' size={28} color={'white'} style={styles.fabTxt} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Categorias;

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
  mainCell: {

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