
export interface Admin {
    email: string
    password: string
    returnSecureToken?: boolean
  }
  
  export interface FbAuthResponse
  {
    idToken:string
    expiresIn:string
  }

  export interface Product
  {
    id?:string;
    title:string;
    text:string;
    price:number;
    count:number;
    img:File;
  }

  export interface FbCreateResponse
  {
    name:string
  }