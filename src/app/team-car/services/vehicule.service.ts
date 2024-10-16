import { Injectable, signal } from '@angular/core';
import { VehiculeProvider } from '../providers/vehicule.provider';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseAddVehicle, ResponseDeleteVehicle, ResponseGetBrands, ResponseGetVehicules, ResponseUpdateVehicle, Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService  implements VehiculeProvider{
  private urlVehicule='http://localhost:3000/'
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  constructor(private httpService:HttpClient) { }
  public  getBrands(): Promise<ResponseGetBrands> {
    throw new Error('Method not implemented.');
  }

  public async  getVehicules(): Promise<ResponseGetVehicules> {
    return await firstValueFrom( this.httpService
      .get<any>(this.urlVehicule+'getVehicle', {},))
  }

  public  async addVehicle(vehicule: Vehicle): Promise<ResponseAddVehicle> {
    return await firstValueFrom( this.httpService
      .post<any>(this.urlVehicule+'addVehicle', {}, {
      }))
  }

  public async  deleteVehicule(): Promise<ResponseDeleteVehicle> {
    return await firstValueFrom( this.httpService
      .post<any>(this.urlVehicule+'deleteVehicle', {}, {
      }))
  }

  public async  updateVehicule(): Promise<ResponseUpdateVehicle> {
    return await firstValueFrom( this.httpService
      .post<any>(this.urlVehicule+'updateVehicle', {}, {
      }))
  }

}
