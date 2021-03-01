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
    "documentacion": "/menu-files/documentacion"
  }

  menu: any = []

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.menu = this.auth.departamentos
  }

}
