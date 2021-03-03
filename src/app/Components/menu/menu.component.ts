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
    "files-admin": "/files-admin",
    "operador": "/operador",
    "supervisor": "/supervisor", 
    "notificacion": "/notificacion",
    "reports": "/reports"
  }

  menu: any = []

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    if (this.auth.rol == "cliente") {
      this.menu = this.auth.departamentos
      if (!this.menu.includes("documentacion")) {
        this.menu.push("documentacion")
      }
    } else if (this.auth.rol == "administrador") {
      this.menu = ["administrador", "crear-aviso", "files-admin", "reports"]
    } else if (this.auth.rol == "operador") {
      this.menu = ["operador"]
    } else if (this.auth.rol == "supervisor") {
      this.menu = ["supervisor", "notificacion"]
    }else if (this.auth.rol == "recepcion") {
      this.menu = ["administrador", "crear-aviso"]
    }
  }

}
