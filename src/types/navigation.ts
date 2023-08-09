import type {RouteProp} from '@react-navigation/native';

export type MainStackParamList = {
    Drawer: undefined;
    Home: undefined;
    Area: undefined;
    AreaAgregar: undefined;
    AreaVer: {areaId: number};
    AreaEditar: {areaId: number};
};

export type AreaVerScreenRouteProp = RouteProp<MainStackParamList, 'AreaVer'>;
export type AreaEditarScreenRouteProp = RouteProp<MainStackParamList, 'AreaEditar'>;