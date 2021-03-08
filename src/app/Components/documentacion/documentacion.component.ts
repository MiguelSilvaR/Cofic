import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCalendar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { compareAsc } from 'date-fns';
import { getFile, getPossibleFiles } from 'src/app/Operations/query';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { DateService } from 'src/app/Services/Date/date.service';
import { QueryService } from 'src/app/Services/Query/query.service';

@Component({
  selector: 'app-documentacion',
  templateUrl: './documentacion.component.html',
  styleUrls: ['./documentacion.component.scss']
})
export class DocumentacionComponent implements OnInit {

  faCalendar: IconDefinition = faCalendar;
  desde!: NgbDateStruct;
  hasta!: NgbDateStruct;

  headers: any = [];
  operations: any = [];
  data: any = [];
  year: any = "";

  constructor(
    private date: DateService,
    private query: QueryService,
    private auth: AuthService,
    private router: ActivatedRoute
  ) {
    this.year = this.router.snapshot.paramMap.get("year")
  }

  ngOnInit(): void {
    this.headers = ["Nombre del documento", "Tipo de archivo", "Periodo de la información", "Fecha de carga", "Operaciones"]
    this.operations = [true, false, false, false, false]
    //this.getFiles()
  }

  checkDatePickersValues(): void {
    this.desde = this.desde === undefined ? this.date.getDefaultDesde() : this.desde
    this.hasta = this.hasta === undefined ? this.date.getDefaultHasta() : this.hasta
  }

  getAllFiles() {
    this.query.executeQuery(
      this.query.getOptions(getPossibleFiles, "network-only", { departamento: "documentacion" }, { headers: this.auth.generateAuthHeader() })
    ).subscribe(
      (data: any) => {
        console.log(data)
        let tempArr = data.data.getPossibleFiles.map(
          (value: any) => {
            let fileArr = value.archivo.split(".")
            return [value.nombre, value.periodo, fileArr[1], value.createdAt]
          }
        )
        this.data = tempArr.filter(
          (value: any) => {
            let since = this.desde.year == 0 ? new Date(8640000000000000) :new Date(this.desde.year, this.desde.month - 1, this.desde.day)
            let until = new Date(this.hasta.year, this.hasta.month - 1, this.hasta.day)
            let fileFecha = new Date(value[3])
            let yearTemp 
            if (this.year == "anteriores") {
              console.log(value[1])
              if (value[1] !== 2021 && value[1] !== 2020) {
                yearTemp = true
              }else {
                yearTemp = false
              }
            }else {
              yearTemp = parseInt(this.year) == value[1] ? true : false
            }
            return compareAsc(fileFecha, since) >= 0 && compareAsc(until, fileFecha) >= 0 && yearTemp
          }
          )
      },
      (err) => console.log(err)
    )
  }

  onClick(): void {
    this.checkDatePickersValues()
    this.getAllFiles()
  }

  descargar(event: any) {
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
