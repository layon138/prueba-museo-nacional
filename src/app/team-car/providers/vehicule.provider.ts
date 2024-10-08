import { ResponseAddVehicle, ResponseDeleteVehicle, ResponseGetBrands, ResponseGetVehicules, ResponseUpdateVehicle, Vehicle } from "../models/vehicle.model";

export abstract class VehiculeProvider{
    public abstract addVehicle(vehicule:Vehicle): Promise<ResponseAddVehicle>;
    public abstract deleteVehicule(): Promise<ResponseDeleteVehicle>;
    public abstract updateVehicule(): Promise<ResponseUpdateVehicle>;
    public abstract getVehicules(): Promise<ResponseGetVehicules>;
    public abstract getBrands(): Promise<ResponseGetBrands>;
}