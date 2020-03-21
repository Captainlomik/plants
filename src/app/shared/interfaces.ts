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
