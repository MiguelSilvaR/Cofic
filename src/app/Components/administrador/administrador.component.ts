import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUserPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminTableSearchForm } from 'src/app/Interfaces/AdminTableSearchForm.interface';
import { deleteUser } from 'src/app/Operations/mutation';
import { allUsersAdmin } from 'src/app/Operations/query';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { MutationService } from 'src/app/Services/Mutation/mutation.service';
import { QueryService } from 'src/app/Services/Query/query.service';
import { UserModalComponent } from '../user-modal/user-modal.component';

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

  recepcion: boolean = false

  constructor(
    private query: QueryService,
    private auth: AuthService,
    private mutation: MutationService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.headers = ["id", "Nombre completo", "Correo", "Telefono", "Tipo de usuario", "Estado", "Operaciones"]
    this.operations = [false, true, false, true, true]
    this.recepcion = this.auth.rol == "recepcion" ? true : false
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
          let tempArr = data.data.allUsuarios.map(
            (value: any) => {
              console.log(value)
              return [value.id, value.username, value.email, value.telefono, value.rol, value.activo ? "Activo" : "Inactivo"]
            }
          )
          this.data = tempArr.filter(
            (value: any) => {
              return (value[5] == filters.estado || filters.estado == "Todos") && (value[4] == filters.usuario || filters.usuario == "todos")
            }
          )
        },
        (err) => console.log(err)
      )
  }

  sendInfo() {
    this.getInfoUsers()
  }

  eliminar(id: any) {
    this.mutation.executeMutation(
      this.mutation.getOptions(deleteUser, { id: { id } }, { headers: this.auth.generateAuthHeader() })
    ).subscribe(
      (data) => {
        alert("Eliminado")
        this.router.navigateByUrl("/")
      },
      (err) => {
        alert("Error")
        this.router.navigateByUrl("/")
      }
    )
  }

  buscar(info: any) {
    const modalRef = this.modalService.open(UserModalComponent);
    modalRef.componentInstance.id = info[0];
    modalRef.componentInstance.name = info[1];
    modalRef.componentInstance.correo = info[2];
    modalRef.componentInstance.phono = info[3];
    modalRef.componentInstance.userType = info[4];
    modalRef.componentInstance.estado = info[5];
  }

  actionReceiver(event: any) {
    console.log(event)
    let info = JSON.parse(event)
    if (info[0] == "eliminar") {
      this.eliminar(info[1][0])
    } else if (info[0] == "buscar") {
      this.buscar(info[1])
    } else if (info[0] == "editar") {
      this.router.navigateByUrl("/update-user/"+encodeURIComponent(info[1][0]))
    }
  }

}


