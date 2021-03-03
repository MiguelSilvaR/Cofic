<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { faCalendar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { DateService } from 'src/app/Services/Date/date.service';

@Component({
  selector: 'app-nominas',
  templateUrl: './nominas.component.html',
  styleUrls: ['./nominas.component.scss']
})
export class NominasComponent implements OnInit {

  faCalendar: IconDefinition = faCalendar;
  desde!: NgbDateStruct;
  hasta!: NgbDateStruct;

  headers: any = [];
  operations: any = [];
  data: any = [];

  constructor(
    private date: DateService
  ) { }

  ngOnInit(): void {
  }

  checkDatePickersValues(): void {
    this.desde = this.desde === undefined ? this.date.getDefaultDesde() : this.desde
    this.hasta = this.hasta === undefined ? this.date.getDefaultHasta() : this.hasta
  }

  onClick(): void {
    this.headers = ["1", "2", "3"]
    this.operations = [true, true, true, true, true]
    this.data = [["1", "2", "3"], ["1", "2", "3"], ["1", "2", "3"]]
    this.checkDatePickersValues()
    console.log(this.desde, this.hasta)
  }

}
=======
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { faCalendar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { DateService } from 'src/app/Services/Date/date.service';
import { QueryService } from 'src/app/Services/Query/query.service';
import { getPossibleFiles } from 'src/app/Operations/query';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nominas',
  templateUrl: './nominas.component.html',
  styleUrls: ['./nominas.component.scss']
})
export class NominasComponent implements OnInit {

  faCalendar: IconDefinition = faCalendar;
  desde!: NgbDateStruct;
  hasta!: NgbDateStruct;

  headers: any = [];
  operations: any = [];
  data: any = [];
  year: any = ""

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
    this.getFiles()
  }

  getFiles(): void {
    this.query.executeQuery(this.query.getOptions(getPossibleFiles, "network-only", { departamento: "nomina" },
      { headers: this.auth.generateAuthHeader() })).subscribe(
        (data) => console.log(data),
        (err) => console.log(err)
      )
  }

  checkDatePickersValues(): void {
    this.desde = this.desde === undefined ? this.date.getDefaultDesde() : this.desde
    this.hasta = this.hasta === undefined ? this.date.getDefaultHasta() : this.hasta
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
>>>>>>> e7c49b7d9a172d403efe578f236c652b79e3527c
