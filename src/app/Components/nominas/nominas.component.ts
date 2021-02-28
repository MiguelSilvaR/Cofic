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
