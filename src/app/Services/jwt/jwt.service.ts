import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JWTService {

  jwtToken: string = "";
  decodedToken!: { [key: string]: string } | null;

  constructor() {
  }

  getDecodedValues(): any {
    return this.decodedToken
  }
  
  deleteToken() {
    this.jwtToken = "";
    this.decodedToken = null
  }

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
    }
  }

  decodeToken(): void {
    if (this.jwtToken) {
      try {
        this.decodedToken = jwt_decode(this.jwtToken);
      }catch(e) {
        this.decodedToken = null
        this.jwtToken = ""
      }
    }
  }

  getDecodeToken(): unknown {
    return jwt_decode(this.jwtToken);
  }

  getExpiryTime(): string | null {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: any = this.getExpiryTime();
    if(expiryTime == null) {
      return true
    }else if (expiryTime) {
      return ((1000 * expiryTime) <= (new Date()).getTime()) ;
    }else {
      return false;
    }
  }
}