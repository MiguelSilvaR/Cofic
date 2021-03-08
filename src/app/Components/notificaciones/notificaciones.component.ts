import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { resolveNot } from 'src/app/Operations/mutation';
import { notificaciones } from 'src/app/Operations/query';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { MutationService } from 'src/app/Services/Mutation/mutation.service';
import { QueryService } from 'src/app/Services/Query/query.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  headers:any = [];
  operations:any = [];
  data:any = [];
  ids: any = []

  constructor(
    private query: QueryService,
    private auth: AuthService,
    private mutation: MutationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.headers = ["id", "Notificación","Usuario","Fecha de notificación", "Operaciones"]
    this.operations = [false,false,true,false,false]
    this.getNotificaciones()
  }

  getNotificaciones() {
    this.query.executeQuery(
      this.query.getOptions(notificaciones,"network-only", undefined, { headers: this.auth.generateAuthHeader() })
    ).subscribe(
      (data: any) => {
        this.data = data.data.getNotificaciones.map(
          (value: any) => {
            this.ids.push(value.id)
            return [value.id, "Documento de " + value.departamento + " " + value.tipoNotificacion, value.usuario.email, value.createdAt ]
          }
        )
      },
      (err) => console.log(err)
    )
  }

  resolveNotificaion(info: string) {
    this.mutation.executeMutation(this.mutation.getOptions(resolveNot, { id: { id: info } }, { headers: this.auth.generateAuthHeader() }))
    .subscribe(
      (data) => {
        alert("Notificación resuelta")
        this.router.navigateByUrl("/")
      },
      (err) => {
        alert("Error")
        this.router.navigateByUrl("/")
      }
    )
  }

  actionReceiver(event: any) {
    console.log(event)
    let info = JSON.parse(event)
    info = info[1][0]
    this.resolveNotificaion(info)
  }

}
