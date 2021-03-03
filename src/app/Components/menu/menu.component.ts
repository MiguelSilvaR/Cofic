<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
=======
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  rutas: any = {
    "nomina": "/menu-files/nomina",
    "contabilidad": "/menu-files/contabilidad",
    "recursoshumanos": "/menu-files/recursoshumanos",
    "documentacion": "/menu-files/documentacion",
    "administrador": "/administrador", 
    "crear-aviso": "/crear-aviso", 
    "files-admin": "/files-admin"
  }

  menu: any = []

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    if (this.auth.rol == "cliente") {
      this.menu = this.auth.departamentos
    } else if(this.auth.rol == "administrador") {
      this.menu = ["administrador", "crear-aviso", "files-admin"]
    }
  }

}
>>>>>>> e7c49b7d9a172d403efe578f236c652b79e3527c
