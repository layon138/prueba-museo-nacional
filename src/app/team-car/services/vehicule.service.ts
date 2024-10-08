import { Injectable } from '@angular/core';
import { VehiculeProvider } from '../providers/vehicule.provider';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseAddVehicle, ResponseDeleteVehicle, ResponseGetBrands, ResponseGetVehicules, ResponseUpdateVehicle, Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService  implements VehiculeProvider{

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  constructor(private httpService:HttpClient) { }
  public  getBrands(): Promise<ResponseGetBrands> {
    throw new Error('Method not implemented.');
  }

  public  getVehicules(): Promise<ResponseGetVehicules> {
    throw new Error('Method not implemented.');
  }
  public  async addVehicle(vehicule: Vehicle): Promise<ResponseAddVehicle> {
    const response =await firstValueFrom( this.httpService
      .post<any>('http://localhost:3000/addVehicle', {}, {
      }))

    return  response;
  }

  public deleteVehicule(): Promise<ResponseDeleteVehicle> {
    throw new Error('Method not implemented.');
  }

  public updateVehicule(): Promise<ResponseUpdateVehicle> {
    throw new Error('Method not implemented.');
  }

}
