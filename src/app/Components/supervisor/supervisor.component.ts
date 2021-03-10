import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCalendar, faFileUpload, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { compareAsc } from 'date-fns';
import { deleteFile } from 'src/app/Operations/mutation';
import { allClientes, getFile, getPossibleFiles } from 'src/app/Operations/query';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { MutationService } from 'src/app/Services/Mutation/mutation.service';
import { QueryService } from 'src/app/Services/Query/query.service';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements OnInit {

  faCalendar: IconDefinition = faCalendar;
  faFileUpload: IconDefinition = faFileUpload;
  desde!: NgbDateStruct;
  hasta!: NgbDateStruct;

  headers: any = [];
  operations: any = [];
  data: any = [];
  clientes: any = []

  formSupervisor: FormGroup = new FormGroup({
    "cliente": new FormControl("", [Validators.required]),
    "estado": new FormControl("", [Validators.required])
  })

  constructor(
    private query: QueryService,
    private auth: AuthService,
    private mutation: MutationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.headers = ["id","Nombre del documento", "Cliente", "Tipo de archivo", "Fecha de carga", "Estado", "Operaciones"]
    this.operations = [true, true, false, false, false]
    this.getClientes()
  }

  getClientes(): void {
    this.query.executeQuery(
      this.query.getOptions(allClientes, "network-only", undefined, { headers: this.auth.generateAuthHeader() })
    ).subscribe(
      (data: any) => {
        console.log(data)
        this.clientes = data.data.allClientes
      },
      (err: any) => console.log(err)
    )
  }

  getValues() {
    return {
      cliente: this.formSupervisor.controls["cliente"].value,
      estado: this.formSupervisor.controls["estado"].value
    }
  }

  onClick() {
    console.log(this.getValues())
    this.getAllFiles()
  }

  getAllFiles() {
    let filters = this.getValues()
    this.query.executeQuery(
      this.query.getOptions(getPossibleFiles, "network-only", { departamento: this.auth.departamentos.join() }, { headers: this.auth.generateAuthHeader() })
    ).subscribe(
      (data: any) => {
        console.log(data)
        let tempArr = data.data.getPossibleFiles.map(
          (value: any) => {
            let fileArr = value.archivo.split(".")
            return [value.id, value.nombre, value.cliente == null ? "Todos" : value.cliente.nombreContacto, fileArr[1], value.createdAt, value.estado]
          }
        )

        this.data = tempArr.filter(
          (value: any) => {
            let since = this.desde.year == 0 ? new Date(8640000000000000) : new Date(this.desde.year, this.desde.month - 1, this.desde.day)
            let until = new Date(this.hasta.year, this.hasta.month - 1, this.hasta.day)
            let fileFecha = new Date(value[4])
            return compareAsc(fileFecha, since) >= 0 && compareAsc(until, fileFecha) >= 0
              && (value[5] == filters.estado || filters.estado == "todos")
              && (value[2] == filters.cliente || filters.cliente == "todos")
          }
        )
      },
      (err) => console.log(err)
    )
  }


  actionReceiver(event: any) {
    console.log(event)
    let tempArr = JSON.parse(event)
    console.log(tempArr)
    if (tempArr[0] == "descargar") {
      this.getFile(tempArr[1][1], tempArr[1][3])
    }
    if (tempArr[0] == "eliminar") {
      this.eliminar(tempArr[1][0])
    }
    if (tempArr[0] == "editar") {
      this.editar(tempArr[1][0])
    }
  }

  editar(id: any) {
    this.router.navigateByUrl(`/update/${ id }`)
  }

  eliminar(id: any) {
    this.mutation.executeMutation(
      this.mutation.getOptions(deleteFile, { id: { id} }, { headers: this.auth.generateAuthHeader() })
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

  getFile(name: string, ext: string) {
    this.query.executeQuery(
      this.query.getOptions(getFile, "network-only", { name }, { headers: this.auth.generateAuthHeader() }
      )).subscribe(
        (data: any) => {
          const source = `data:application/${ext};base64,${data.data.getFile}`;
          const link = document.createElement("a");
          link.href = source;
          link.download = `${name}`
          link.click();
        },
        (err) => console.log(err)
      )
  }
}
