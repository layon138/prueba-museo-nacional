import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthProvider } from '../providers/auth-.provider';
import { RequestAuthUser, ResponseAuthUser } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthProvider {
  private urlAuth='http://localhost:3000/'
  constructor(private httpService:HttpClient) { }
  
  public  async validateUser(user: RequestAuthUser): Promise<ResponseAuthUser> {
    const response =await firstValueFrom( this.httpService
      .post<any>(this.urlAuth+'auth', user, {
      }))

    return  response;
  }

  public saveUser(user:string){
    localStorage.setItem("user",user)
  }
}
