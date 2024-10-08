import { Observable } from "rxjs";
import { RequestAuthUser, ResponseAuthUser } from "../models/auth.model";

export abstract class AuthProvider{
    public abstract validateUser(user:RequestAuthUser):Promise<ResponseAuthUser> ;
    public abstract saveUser(token:string):void;
}