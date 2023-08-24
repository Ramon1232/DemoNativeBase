import type {RouteProp} from '@react-navigation/native';

export type MainStackParamList = {
    Drawer: undefined;
    Home: undefined;
    
    ClienteInterno: undefined;
    ClienteVer: {customerId: number};
    ClienteEditar: {customerId: number};
    ClienteAgregar: undefined;

    Proyectos: undefined;
    ProyectosVer: {projectId: number};
    ProyectosEditar: {projectId: number};
    ProyectosAgregar: undefined;

    Ubicaciones: undefined;
    UbicacionesVer: {locationId: number};
    UbicacionesEditar: {locationId: number};
    UbicacionesAgregar: undefined;

    Area: undefined;
    AreaAgregar: undefined;
    AreaVer: {areaId: number};
    AreaEditar: {areaId: number};

    Categorias: undefined;
    CategoriasVer: {categoryId: number};
    CategoriasEditar: {categoryId: number};
    CategoriasAgregar: undefined;
};

// Types Projects
export type ClienteVerScreenRouteProp = RouteProp<MainStackParamList, 'ClienteVer'>;
export type ClienteEditarScreenRouteProp = RouteProp<MainStackParamList, 'ClienteEditar'>;

// Types Projects
export type ProyectosVerScreenRouteProp = RouteProp<MainStackParamList, 'ProyectosVer'>;
export type ProyectosEditarScreenRouteProp = RouteProp<MainStackParamList, 'ProyectosEditar'>;

// Types categoria
export type UbicacionesVerScreenRouteProp = RouteProp<MainStackParamList, 'UbicacionesVer'>;
export type UbicacionesEditarScreenRouteProp = RouteProp<MainStackParamList, 'UbicacionesEditar'>;

// Types categoria
export type CategoriasVerScreenRouteProp = RouteProp<MainStackParamList, 'CategoriasVer'>;
export type CategoriasEditarScreenRouteProp = RouteProp<MainStackParamList, 'CategoriasEditar'>;

// Types Area
export type AreaVerScreenRouteProp = RouteProp<MainStackParamList, 'AreaVer'>;
export type AreaEditarScreenRouteProp = RouteProp<MainStackParamList, 'AreaEditar'>;
