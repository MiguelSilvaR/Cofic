import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCalendar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { allClientes, getAllFiles, getFile } from 'src/app/Operations/query';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { QueryService } from 'src/app/Services/Query/query.service';
import { Router } from '@angular/router';
import { compareAsc, compareDesc } from 'date-fns'

@Component({
  selector: 'app-files-admin',
  templateUrl: './files-admin.component.html',
  styleUrls: ['./files-admin.component.scss']
})
export class FilesAdminComponent implements OnInit {

  faCalendar: IconDefinition = faCalendar;
  desde!: NgbDateStruct;
  hasta!: NgbDateStruct;

  filesAdmin: FormGroup = new FormGroup({
    "cliente": new FormControl("", [Validators.required]),
    "estado": new FormControl("", [Validators.required])
  })
  headers: any = [];
  operations: any = [];
  data: any = [];
  clientes: any = []

  constructor(
    private query: QueryService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.headers = ["Nombre del documento", "Cliente", "Tipo de archivo", "Fecha de carga", "Estado", "id", "Operaciones"]
    this.operations = [true, false, false, false, true]
    this.getClientes()
  }

  getValues() {
    return {
      cliente: this.filesAdmin.controls["cliente"].value,
      estado: this.filesAdmin.controls["estado"].value
    }
  }

  onClick() {
    console.log(this.getValues())
    this.getAllFiles()
  }

  getClientes(): void {
    this.query.executeQuery(
      this.query.getOptions(allClientes, "network-only", undefined, { headers: this.auth.generateAuthHeader() })
    ).subscribe(
      (data: any) => {
        console.log(data)
        this.clientes = data.data.allClientes
      },
      (err) => console.log(err)
    )
  }

  getAllFiles() {
    let filters = this.getValues()
    this.query.executeQuery(
      this.query.getOptions(getAllFiles, "network-only", undefined, { headers: this.auth.generateAuthHeader() })
    ).subscribe(
      (data: any) => {
        console.log(data)
        let tempArr = data.data.allFiles.edges.map(
          (value: any) => {
            let fileArr = value.node.archivo.split(".")
            return [value.node.nombre, value.node.cliente == null ? "Todos" : value.node.cliente.nombreContacto, fileArr[1], value.node.createdAt, value.node.estado, value.node.id]
          }
        )

        this.data = tempArr.filter(
          (value: any) => {
            let since = new Date(this.desde.year, this.desde.month - 1, this.desde.day)
            let until = new Date(this.hasta.year, this.hasta.month - 1, this.hasta.day)
            let fileFecha = new Date(value[3])
            return compareAsc(fileFecha, since) >= 0 && compareAsc(until, fileFecha) >= 0
              && (value[4] == filters.estado || filters.estado == "todos")
              && (value[1] == filters.cliente || filters.cliente == "todos")
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
      this.getFile(tempArr[1][0], tempArr[1][2])
    }
    if (tempArr[0] == "editar") {
      this.editar(tempArr[1][5])
    }
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

  editar(id: any) {
    id = encodeURIComponent(id)
    this.router.navigateByUrl(`/update/${id}`)
  }

}
