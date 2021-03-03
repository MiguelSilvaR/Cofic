import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCalendar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { getPossibleFiles } from 'src/app/Operations/query';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { DateService } from 'src/app/Services/Date/date.service';
import { QueryService } from 'src/app/Services/Query/query.service';

@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.component.html',
  styleUrls: ['./contabilidad.component.scss']
})
export class ContabilidadComponent implements OnInit {

  faCalendar: IconDefinition = faCalendar;
  desde!: NgbDateStruct;
  hasta!: NgbDateStruct;

  headers:any = [];
  operations:any = [];
  data:any = [];
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

  getFiles(): void {
    this.query.executeQuery(this.query.getOptions(getPossibleFiles, "network-only", { departamento: "contabilidad" },
      { headers: this.auth.generateAuthHeader() })).subscribe(
        (data) => console.log(data),
        (err) => console.log(err)
      )
  }

  onClick(): void {
    this.data = [["1", "2", "3", "4"], ["1", "2", "3", "4"], ["1", "2", "3", "4"]]
    this.checkDatePickersValues()
    console.log(this.desde, this.hasta)
  }

  descargar(event: any) {
    console.log(event)
  }

}
