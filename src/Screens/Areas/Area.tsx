import { Alert, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, CheckIcon, FlatList, Flex, Input, Select, Text, View } from 'native-base'
import axios from 'axios';
import { MainStackParamList } from '../../types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
    const [activeOnly, setActiveOnly] = useState(false);
    const [active, setActive] = React.useState("");
    const [refreshing, setRefreshing] = useState(false);

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
                <Text style={styles.cell}>{item.areaId}</Text>
                <Text style={styles.cell}>{item.main}</Text>
                {/* <Text style={styles.cell}>{item.second}</Text> */}
                <Text style={styles.cell}>{item.active ? 'Activo' : 'Inactivo'}</Text>
            </View>
        </TouchableOpacity>
    );

    const filteredData = data.filter(item =>
        item.main.toLowerCase().includes(searchText.toLowerCase()) &&
        (!active || item.active === (active === "true"))
    );

    const getAreas = () => {
        axios.get('http://192.168.1.70:3000/areas')
            .then((response) => {
                setData(response.data.areas);
            })
            .catch((error) => {
            })
    }

    const verArea = (areaId: number) => {
        navigation.navigate('AreaVer', { areaId: areaId });
    }

    return (
        <View flex={1} >
            <Input size={'lg'} 
                   variant={'outline'} 
                   placeholder='Buscar por principal' 
                   m={5}
                   fontWeight={'light'} 
                   value={searchText} 
                   onChangeText={text => setSearchText(text)} />
            <Box maxW={250}>
                <Select size={'lg'}
                    m={5}
                    fontWeight={'light'} 
                    selectedValue={active}
                    minWidth="200"
                    accessibilityLabel="Choose Active"
                    placeholder="Activo"
                    _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={itemValue => setActive(itemValue)}>
                    <Select.Item label="Buscar por estado" value='' />
                    <Select.Item label="Activo" value="true" />
                    <Select.Item label="Inactivo" value="false" />
                </Select>
            </Box>
            <View style={styles.headerRow}>
                <Text style={styles.headerCell}>Id</Text>
                <Text style={styles.headerCell}>Principal</Text>
                {/* <Text style={styles.headerCell}>Secundaria</Text> */}
                <Text style={styles.headerCell}>Estado</Text>
            </View>
            <FlatList
                data={filteredData}
                renderItem={renderRow}
                keyExtractor={(item) => item.areaId.toString()}
                refreshControl={ // Agregar esta línea
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
            <TouchableOpacity
                style={styles.fabLocation}
                onPress={() => navigation.navigate('AreaAgregar')}>
                <View style={styles.fab}>
                    <Text style={styles.fabTxt}>Agregar</Text>
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
        marginBottom: 20,
    },
    cell: {
        flex: 1,
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '300'
    },
    fab: {
        backgroundColor: '#193250',
        width: 120,
        height: 80,
        borderRadius: 20,
        justifyContent: 'center'
    },
    fabTxt: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '200'
    },
    fabLocation: {
        position: 'absolute',
        bottom: 40,
        right: 60
    }
})