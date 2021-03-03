<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faLock, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../Services/auth/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faUser: IconDefinition = faUser;
  faLock: IconDefinition = faLock;

  user: string = '';
  password: string = '';
  token: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isTokenValid()) {
      this.router.navigate(["/menu"])
    }
  }

  ngOnInit(): void {
    //console.log("Login");
  }

  submit(): void {
    this.authService.login(this.user, this.password).subscribe(
      (data: any) => {
        this.authService.setToken(data['data']['tokenAuth']['token']);
      },
      (err: any) => {
        alert("Usuario o contrasena equivocadas");
      }
    );
  }

}
=======
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QueryOptions } from '@apollo/client';
import { faUser, faLock, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { miUsuario } from 'src/app/Operations/query';
import { QueryService } from 'src/app/Services/Query/query.service';
import { AuthService } from '../../Services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faUser: IconDefinition = faUser;
  faLock: IconDefinition = faLock;

  user: string = '';
  password: string = '';
  token: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private query: QueryService
  ) {
    if (this.authService.isTokenValid()) {
      this.router.navigate(["/menu"])
    }
  }

  ngOnInit(): void {
    //console.log("Login");
  }

  submit(): void {
    this.authService.login(this.user, this.password).subscribe(
      (data: any) => {
        this.authService.setToken(data['data']['tokenAuth']['token']);
        this.getUserData()
      },
      (err: any) => {
        alert("Usuario o contrasena equivocadas");
      }
    );
  }

  getMiUsuarioOptions(): QueryOptions {
    return {
      query: miUsuario,
      fetchPolicy: "network-only",
      context: {
        headers: this.authService.generateAuthHeader()
      }
    }
  }

  getUserData() {
    this.query.executeQuery(this.getMiUsuarioOptions()).subscribe(
      (data: any) => {
        console.log(data.data.miUsuario)
        this.authService.departamentos = data.data.miUsuario.departamento.split(",")
        console.log(this.authService.departamentos)
        this.authService.rol = data.data.miUsuario.rol
        this.authService.setInfo()
        this.authService.changeState()
        this.router.navigate(["/menu"])
      },
      (err) => {
        console.log(err)
      }
    )
  }

}
>>>>>>> e7c49b7d9a172d403efe578f236c652b79e3527c
