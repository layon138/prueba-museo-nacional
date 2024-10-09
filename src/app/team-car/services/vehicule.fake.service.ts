import { Injectable } from '@angular/core';
import { VehiculeProvider } from '../providers/vehicule.provider';
import { Vehicle, ResponseAddVehicle, ResponseDeleteVehicle, ResponseUpdateVehicle, ResponseGetVehicules, ResponseGetBrands } from '../models/vehicle.model';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class VehiculeFakeService  implements VehiculeProvider{

  private currentVehicules=[
    {
      name: "Model X",
      description: "A high-performance electric SUV with advanced features.",
      brand: [{"id":uuidv4(),"itemName":"Tesla"}],
      staffInCharge: [{"id":uuidv4(),"itemName":"Alice Johnson"}, {"id":uuidv4(),"itemName":"Bob Smith"},],
      actions: [
          {
              name: "Inspect",
              description: "Check the overall condition and performance of the vehicle.",
              listAffected: ["Tires", "Brakes", "Battery"]
          },
          {
              name: "Service",
              description: "Perform regular maintenance on the vehicle.",
              listAffected: ["Engine", "Fluids", "Filters"]
          },
          {
              name: "Clean",
              description: "Wash and detail the exterior and interior of the vehicle.",
              listAffected: ["Exterior", "Interior", "Windows"]
          }
      ]
  }
  ]
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  
  public  getBrands(): Promise<ResponseGetBrands> {
    const mockGetBrands: ResponseGetBrands = {
      listBrands:[
        {"id":uuidv4(),"itemName":"Tesla"},
        {"id":uuidv4(),"itemName":"toyota"},
        {"id":uuidv4(),"itemName":"Nisan"},
      ]
    };

    return new Promise((resolve) => {
      setTimeout(() => {
          resolve(mockGetBrands);
      }, 1000);
  });
  }
  public  addVehicle(vehicule: Vehicle): Promise<ResponseAddVehicle> {
    const fakeAddVehicle:ResponseAddVehicle ={
        status:'success'
      };
      this.changeMessage("mama")
      this.currentVehicules.push(vehicule)
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(fakeAddVehicle);
      }, 1000);
  });
  }
  public  deleteVehicule(): Promise<ResponseDeleteVehicle> {
    throw new Error('Method not implemented.');
  }
  public  updateVehicule(): Promise<ResponseUpdateVehicle> {
    throw new Error('Method not implemented.');
  }
  public getVehicules(): Promise<ResponseGetVehicules> {

    const mockVehicle: ResponseGetVehicules = {
      listVehicles:this.currentVehicules
    };
  
  

    return new Promise((resolve) => {
      setTimeout(() => {
          resolve(mockVehicle);
      }, 1000);
  });
  }

}