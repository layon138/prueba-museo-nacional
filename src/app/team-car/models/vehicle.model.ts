export interface Vehicle{
    name: string;
    description: string;
    brand: Brand[];
    staffInCharge: StaffInCharge[];
    actions: Action[];
}

export interface Action{
    name: string;
    description: string;
    listAffected: string[];
}

export interface Brand{
    id: string;
    itemName: string;
}

export interface StaffInCharge{
    id: string;
    itemName: string;
}

export interface Affectations{
    id: string;
    itemName: string;
    percentage: number;
    description: string;
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
    listBrands: Brand[];
}





