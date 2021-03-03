import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCalendar, faFileUpload, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { compareAsc } from 'date-fns';
import { allClientes, getFile, getPossibleFiles } from 'src/app/Operations/query';
import { AuthService } from 'src/app/Services/auth/auth.service';
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

  headers:any = [];
  operations:any = [];
  data:any = [];
  clientes: any = []

  formSupervisor: FormGroup = new FormGroup({
    "cliente": new FormControl("", [Validators.required]),
    "estado": new FormControl("", [Validators.required])
  })

  constructor(
    private query: QueryService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.headers = ["Nombre del documento", "Cliente", "Tipo de archivo", "Fecha de carga", "Estado", "Operaciones"]
    this.operations = [true, true, true, false, false]
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
            return [fileArr[0], value.cliente.nombreContacto, fileArr[1], value.createdAt, value.estado]
          }
        )

        this.data = tempArr.filter(
          (value: any) => {
            let since = this.desde.year == 0 ? new Date(8640000000000000) :new Date(this.desde.year, this.desde.month - 1, this.desde.day)
            let until = new Date(this.hasta.year, this.hasta.month - 1, this.hasta.day)
            let fileFecha = new Date(value[3])
            return compareAsc(since, fileFecha) == 1 && compareAsc(fileFecha, until) == 1
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
      this.getFile(tempArr[1][0] + "." + tempArr[1][2], tempArr[1][2])
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
}
