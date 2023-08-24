import { StyleSheet, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, CheckIcon, FlatList, Flex, Input, Select, Text, View } from 'native-base'
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MainHeader from '../../components/MainHeader';

interface DataItem {
    areaId: number;
    main: string;
    second: string;
    thirth: string;
    active: boolean;
}

const Area = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {

    const [data, setData] = useState<DataItem[]>([]);
    const [searchText, setSearchText] = useState('');
    const [active, setActive] = React.useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        getAreas();
        setRefreshing(false);
    };

    useEffect(() => {
        getAreas();
    }, []);

    const renderRow = ({ item }: { item: DataItem }) => (
        <TouchableOpacity onPress={() => verArea(item.areaId)}>
            <View style={styles.row}>
                <Text style={[styles.cell, styles.idCell]}>{item.areaId}</Text>
                <Text style={[styles.cell, styles.mainCell]}>{[item.main, item.second, item.thirth].join(" / ")}</Text>
                <MaterialIcons style={[styles.checkCell, styles.stateCell]} name={item.active ? 'check-box' : 'check-box-outline-blank'} size={24} color={'black'}/>
                {/* <Text style={[styles.cell, styles.stateCell]}>{item.active ? 'Activo' : 'Inactivo'}</Text> */}
            </View>
        </TouchableOpacity>
    );

    const filteredData = data.filter(item =>
        item.main.toLowerCase().includes(searchText.toLowerCase()) &&
        (!active || item.active === (active === "true"))
    );

    const getAreas = () => {
        // axios.get('http://192.168.1.70:3000/areas')
        axios.get('http://158.97.121.147:3000/areas/')
            .then((response) => {
                setData(response.data.areas);
                setError(false);
            })
            .catch((error) => {
                setError(true);
            })
    }

    const verArea = (areaId: number) => {
        navigation.navigate('AreaVer', { areaId: areaId });
    }

    return (
        <View flex={1} >
            <MainHeader
                navigation={navigation}
                title="Áreas"
                onRefresh={getAreas}
            />
            <Flex direction='column' m={5}>
                <Text mb={2} fontWeight={300}>Buscar por principal</Text>
                <Input size={'lg'}
                    variant={'outline'}
                    placeholder='Ej. "Coordinación"'
                    fontWeight={'light'}
                    value={searchText}
                    onChangeText={text => setSearchText(text)} />
                <Text mt={2} mb={2} fontWeight={300}>Buscar por estado</Text>
                <Box>
                    <Select size={'lg'}
                        fontWeight={'light'}
                        selectedValue={active}
                        minWidth="200"
                        accessibilityLabel="Choose Active"
                        placeholder="Activo"
                        _selectedItem={{
                            bg: "primary.700",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1} onValueChange={itemValue => setActive(itemValue)}>
                        <Select.Item label="Seleccionar" value='' />
                        <Select.Item label="Activo" value="true" />
                        <Select.Item label="Inactivo" value="false" />
                    </Select>
                </Box>
            </Flex>
            <Box flex={1} maxH={'65%'}>
                <View style={styles.headerRow}>
                    <Text style={[styles.headerCell, styles.idCell]}>Id</Text>
                    <Text style={[styles.headerCell, styles.mainCell]}>Áreas</Text>
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
                        keyExtractor={(item) => item.areaId.toString()}
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
                onPress={() => navigation.navigate('AreaAgregar')}>
                <View style={styles.fab}>
                    <AntDesign name='plus' size={28} color={'white'} style={styles.fabTxt} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Area;

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
        right: 15
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