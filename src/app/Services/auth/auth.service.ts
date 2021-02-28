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

  getLoginOptions(user: any): MutationOptions {
    return {
      mutation: login,
      variables: {
        user
      }
    }
  }
  
  getRefreshOptions(): MutationOptions {
    return {
      mutation: refreshToken,
      variables: {
        token: {
          token: this.getToken()
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

  login(user: any): any {
    return this.mutation.executeMutation(this.getLoginOptions(user))
  }

  logout() {
    this.storage.remove("token");
    this.tokenService.deleteToken()
    console.log(this.tokenService.jwtToken)
  }

  generateAuthHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: "JWT " + this.getToken()
    })
  }

  refreshToken() {
    this.mutation.executeMutation(this.getRefreshOptions()).subscribe(
      (data) => {
        console.log(data.data.refreshToken.token)
        this.setToken(data.data.refreshToken.token)
      },
      (err) => console.log(err)
    )
  }

}