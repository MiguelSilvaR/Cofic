import { HttpHeaders } from '@angular/common/http';
import { ViewFlags } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { MutationOptions } from '@apollo/client/core';
import jwtDecode from 'jwt-decode';
import { login } from '../../Operations/mutation';
import { JWTService } from '../jwt/jwt.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { MutationService } from '../Mutation/mutation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token!: string

  constructor(
    private mutation: MutationService,
    private storage: LocalStorageService,
    private tokenService: JWTService
  ) { }

  isTokenValid(): boolean {
    if (this.tokenService.jwtToken === "")
      return false;
    else if (this.tokenService.isTokenExpired())
      return false;
    return true;
  }

  initializeTokenInApp(): void {
    if (this.storage.exists("token")) {
      let token = this.storage.get("token");
      this.tokenService.setToken(token == null ? "" : token);
      //console.log(this.isTokenValid())
      if (!this.isTokenValid()) {
        //console.log(this.isTokenValid())
        this.storage.remove("token");
        this.tokenService.deleteToken()
      }
    }
  }

  getLoginOptions(username: any, password: any): MutationOptions {
    return {
      mutation: login,
      variables: {
        token:{
          username,
          password
        }
      }
    }
  }

  getToken(): string {
    return this.tokenService.jwtToken;
  }

  setToken(token: string): void {
    this.tokenService.setToken(token);
    this.storage.set("token", token);
  }

  login(user: any, password: any): any {
    return this.mutation.executeMutation(this.getLoginOptions(user,password))
  }

  logout() {
    this.storage.remove("token");
    this.tokenService.deleteToken();
    console.log(this.tokenService.jwtToken)
  }

  generateAuthHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: "JWT " + this.getToken()
    })
  }

  getDecodedToken(): any {
    return this.tokenService.getDecodedValues();
  }

}