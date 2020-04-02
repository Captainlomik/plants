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
}

export interface Email 
{
  email:string;
}