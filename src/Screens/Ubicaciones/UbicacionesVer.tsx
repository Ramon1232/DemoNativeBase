import React, { useEffect, useState } from 'react'
import { Button, FlatList, Input, Text, TextArea, View, Flex, Box, HStack, ScrollView, Spinner, Heading } from 'native-base'
import { MainStackParamList, UbicacionesVerScreenRouteProp } from '../../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { RefreshControl, StyleSheet, Switch, TouchableOpacity } from 'react-native';
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

const UbicacionesVer = ({ navigation }: NativeStackScreenProps<MainStackParamList>) => {
    const [data, setData] = useState<DataItem[]>([]);
    const route = useRoute<UbicacionesVerScreenRouteProp>();
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    const onRefresh = () => {
        setRefreshing(true);
        getLocations();
        setRefreshing(false);
    };

    useEffect(() => {
        getLocations();
    }, []);

    const getLocations = () => {
        setLoading(true);
        axios.get('http://192.168.1.70:3000/locations/' + route.params.locationId)
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

    const editLocation = (locationId: number) => {
      navigation.navigate('UbicacionesEditar', { locationId: locationId });
  }

    const toggleSwitch = () => {
        if (data.length > 0) {
            const updatedData = data.map(item => ({ ...item, active: !item.active }));
            setData(updatedData);
        }
    }

    const breadcrumbItems = [
        { label: 'Ubicaciones', onPress: () => navigation.goBack() },
        { label: 'Visualizar ubicación', onPress: () => getLocations() },
        // { label: 'Editar categoria', onPress: () => navigation.navigate('AreaEditar', { areaId: route.params.categoryId }) },
    ];

    const renderDataItem = ({ item }: { item: DataItem }) => (
        <ScrollView
            flex={1}
            refreshControl={ // Agregar esta línea
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {data.length > 0 && (
                <Flex direction="column" m={5}>
                    <Breadcrumb items={breadcrumbItems} />
                    <Text fontSize={'md'} fontWeight={'light'} mt={5}>Nro. de edificio:</Text>
                    <Input
                        value={item.roomNumber}
                        size={'lg'}
                        variant={'underlined'}
                        editable={false}
                        fontWeight={'light'}
                    />
                    <Text fontSize={'md'} fontWeight={'light'} mt={5}>building</Text>
                    <Input
                        value={item.building}
                        size={'lg'}
                        variant={'underlined'}
                        editable={false}
                        fontWeight={'light'}
                    />
                    <Text fontSize={'md'} fontWeight={'light'} mt={5}>room</Text>
                    <Input
                        value={item.room}
                        size={'lg'}
                        variant={'underlined'}
                        editable={false}
                        fontWeight={'light'}
                    />
                    <Text fontSize={'md'} fontWeight={'light'} mt={5}>locker number</Text>
                    <Input
                        value={item.lockerNumber}
                        size={'lg'}
                        variant={'underlined'}
                        editable={false}
                        fontWeight={'light'}
                    />
                    <Text fontSize={'md'} fontWeight={'light'} mt={5}>locker</Text>
                    <Input
                        value={item.locker}
                        size={'lg'}
                        variant={'underlined'}
                        editable={false}
                        fontWeight={'light'}
                    />
                    <Text fontSize={'md'} fontWeight={'light'} mt={5}>Container</Text>
                    <Input
                        value={item.container}
                        size={'lg'}
                        variant={'underlined'}
                        editable={false}
                        fontWeight={'light'}
                    />

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
                            onPress={() => editLocation(item.locationId)}
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
            <ResponsiveHeader
                navigation={navigation}
                title="Ubicaciones"
                rightContent={<Text>Actualizar</Text>}
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
        marginTop: 50,
        alignSelf: 'center'
    },
})

export default UbicacionesVer;