import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MutationOptions } from '@apollo/client/core';
import { BehaviorSubject } from 'rxjs';
import { login } from '../../Operations/mutation';
import { JWTService } from '../jwt/jwt.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { MutationService } from '../Mutation/mutation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token!: string
  rol!: any
  departamentos!: any[]

  public myObservable = new BehaviorSubject<boolean>(false);
  public myObservable$ = this.myObservable.asObservable();

  constructor(
    private mutation: MutationService,
    private storage: LocalStorageService,
    private tokenService: JWTService) { }

  changeState(value: boolean) {
    this.myObservable.next(value)
  }

  isTokenValid(): boolean {
    if (this.tokenService.jwtToken === "") {
      return false;
    }
    else if (this.tokenService.isTokenExpired())
      return false;
    return true;
  }

  initializeTokenInApp(): void {
    if (this.storage.exists("token")) {
      this.rol = this.storage.get("rol");
      let dep = this.storage.get("departamentos")
      this.departamentos = dep != null ? JSON.parse(dep) : [];
      let token = this.storage.get("token");
      this.tokenService.setToken(token == null ? "" : token);
      this.changeState(true)
      if (!this.isTokenValid()) {
        this.storage.remove("token");
        this.storage.remove("departamentos");
        this.storage.remove("rol");
        this.tokenService.deleteToken()
        this.changeState(false)
      }
    }
  }

  getLoginOptions(username: any, password: any): MutationOptions {
    return {
      mutation: login,
      variables: {
        token: {
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

  setInfo(): void {
    this.storage.set("rol", this.rol);
    this.storage.set("departamentos", JSON.stringify(this.departamentos));
  }

  login(user: any, password: any): any {
    return this.mutation.executeMutation(this.getLoginOptions(user, password))
  }

  logout() {
    this.changeState(false);
    this.storage.remove("token");
    this.storage.remove("departamentos");
    this.storage.remove("rol");
    this.tokenService.deleteToken();
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