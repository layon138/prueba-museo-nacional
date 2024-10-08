import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, firstValueFrom, from, of } from 'rxjs';
import { AuthProvider } from '../providers/auth-.provider';
import { RequestAuthUser, ResponseAuthUser } from '../models/auth.model';
import { TargetBinder } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthFakeService  implements AuthProvider {

  constructor() { }


    public async validateUser(user:RequestAuthUser): Promise<ResponseAuthUser>  {
        const fakeValidateUser:ResponseAuthUser={
            status: 'success',
            token: 'jklasdkjsdajkdjk1231321321'
        };
    
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(fakeValidateUser);
            }, 1000);
        });
    }


    public saveUser() {
        throw new Error('Method not implemented.');
    }
}