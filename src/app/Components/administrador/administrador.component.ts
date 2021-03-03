<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faUserPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AdminTableSearchForm } from 'src/app/Interfaces/AdminTableSearchForm.interface';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  faUserPlus: IconDefinition = faUserPlus;

  adminForm: FormGroup = new FormGroup({
    "usuario": new FormControl("", [Validators.required]),
    "estado": new FormControl("", [Validators.required])
  })

  headers:any = [];
  operations:any = [];
  data:any = [];

  constructor() { }

  ngOnInit(): void {
  }

  getFormValues(): AdminTableSearchForm {
    return {
      usuario: this.adminForm.controls["usuario"].value,
      estado: this.adminForm.controls["estado"].value
    }
  }

  sendInfo() {
    console.log(this.getFormValues())
    this.headers = ["1","2","3"]
    this.operations = [true,true,true,true,true]
    this.data = [["1","2","3"],["1","2","3"],["1","2","3"]]
  }

}
=======
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faUserPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AdminTableSearchForm } from 'src/app/Interfaces/AdminTableSearchForm.interface';
import { allUsersAdmin } from 'src/app/Operations/query';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { QueryService } from 'src/app/Services/Query/query.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  faUserPlus: IconDefinition = faUserPlus;

  adminForm: FormGroup = new FormGroup({
    "usuario": new FormControl("", [Validators.required]),
    "estado": new FormControl("", [Validators.required])
  })

  headers: any = [];
  operations: any = [];
  data: any = [];

  constructor(
    private query: QueryService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.headers = ["Nombre completo", "Correo", "Telefono", "Tipo de usuario", "Estado", "Operaciones"]
    this.operations = [false, true, false, true, true]
  }

  getFormValues(): AdminTableSearchForm {
    return {
      usuario: this.adminForm.controls["usuario"].value,
      estado: this.adminForm.controls["estado"].value
    }
  }

  getInfoUsers() {
    this.query.executeQuery(this.query.getOptions(allUsersAdmin, "network-only",
      undefined, { headers: this.auth.generateAuthHeader() })).subscribe(
        (data: any) => {
          let filters = this.getFormValues()
          let tempArr = data.data.allUsuarios.edges.map(
            (value: any) => {
              console.log(value)
              return [value.node.username, value.node.email, value.node.telefono, value.node.rol, value.node.activo ? "Activo":"Inactivo"]
            }
          )
          this.data = tempArr.filter(
            (value: any) => {
              return (value[4] == filters.estado || filters.estado == "Todos") && (value[3] == filters.usuario || filters.usuario == "todos")
            }
          )
        },
        (err) => console.log(err)
      )
  }

  sendInfo() {
    this.getInfoUsers()
  }

  actionReceiver(event: any) {
    console.log(event)
  }

}
>>>>>>> e7c49b7d9a172d403efe578f236c652b79e3527c
