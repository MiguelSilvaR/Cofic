import { Component, OnInit } from '@angular/core';
import { verAnuncio } from 'src/app/Operations/mutation';
import { getAnuncios } from 'src/app/Operations/query';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { MutationService } from 'src/app/Services/Mutation/mutation.service';
import { QueryService } from 'src/app/Services/Query/query.service';
import { SwalService } from 'src/app/Services/Swal/swal.service';
import { SweetAlertOptions } from 'sweetalert2';

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
    private auth: AuthService,
    private swal: SwalService,
    private query: QueryService,
    private mutation: MutationService
  ) { }

  ngOnInit(): void {
    if (this.auth.rol == "cliente") {
      this.menu = this.auth.departamentos
      if (!this.menu.includes("documentacion")) {
        this.menu.push("documentacion")
      }
    } else if (this.auth.rol == "administrador") {
      this.menu = ["administrador", "crear-aviso", "files-admin", "notificacion", "reports"]
    } else if (this.auth.rol == "operador") {
      this.menu = ["operador"]
    } else if (this.auth.rol == "supervisor") {
      this.menu = ["supervisor", "notificacion"]
    } else if (this.auth.rol == "recepcion") {
      this.menu = ["administrador", "crear-aviso"]
    }
    this.getAnuncios()
  }

  getAnuncios() {
    this.query.executeQuery(
      this.query.getOptions(getAnuncios, "network-only", undefined, { headers: this.auth.generateAuthHeader() })
    ).subscribe(
      (data: any) => {
        console.log(data)
        let modals: (string | SweetAlertOptions<any, any>)[] = []
        let tmpArr = data.data.getAnuncios
        tmpArr.forEach((element:any) => {
          modals.push({icon: "info", title: "Anuncio", text: element.notificacion, allowOutsideClick: false})
        });
        this.swal.swalQueue(modals).then(
          (res: any) => {
            this.verAnuncio(tmpArr)
          }
        )
      },
      (err) => console.log(err)
    )
  }

  verAnuncio(anuncios: any) {
    anuncios.forEach((anuncio: any) => {
      let subs = this.mutation.executeMutation(
        this.mutation.getOptions(verAnuncio, { id: {id: anuncio.id} }, { headers: this.auth.generateAuthHeader() } )
      ).subscribe(
        (data) => {console.log(data); subs.unsubscribe()},
        (err) => {console.log(err); subs.unsubscribe()}
      )
    });
  }

}
