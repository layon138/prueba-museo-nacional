export interface Vehicle{
    name: string;
    description: string;
    brand: string[];
    staffInCharge: string[];
    actions: Action[];
}

export interface Action{
    name: string;
    description: string;
    listAffected: string[];
}

export interface ResponseAddVehicle{
    status: 'success' | 'error';
}

export interface ResponseUpdateVehicle{
    status: 'success' | 'error';
}

export interface ResponseDeleteVehicle{
    status: 'success' | 'error';
}

export interface ResponseGetVehicules{
    listVehicles: Vehicle[];
}

export interface ResponseGetBrands{
    listBrands: string[];
}





