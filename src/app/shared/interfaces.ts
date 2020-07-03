import { AuthUserService } from './authUser.service';
import { Params } from '@angular/router';

export interface Admin {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface FbAuthResponse {
  idToken: string
  expiresIn: string
}

export interface Product {
  id?: string;
  title: string;
  text: string;
  price: number;
  count: number;
  img: File;
}

export interface FbCreateResponse {
  name: string
}

export interface Order {
  id?: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  productId?: string;
  productTitle?: string;
  count: number;
  status?:string;
  stat?:boolean;
}

export interface Email 
{
  email:string;
}

export interface User{
returnSecureToken?: boolean;
name?:string;
surname?:string;
phone?:string;
email:string;
password:string;
}

export interface FbUserAuth
{
  idToken:string;
  expiresIn:string;
}

