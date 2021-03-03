import { Component, OnInit, ViewChild } from '@angular/core';
import { faCalendar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/Services/Date/date.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit {

  constructor(
    private date: DateService
  ) { }

  users = [
    {
      id: 0,
      name: "Oscar"
    }
  ];

  selected_user: any;

  faCalendar: IconDefinition = faCalendar;
  desde!: NgbDateStruct;
  hasta!: NgbDateStruct;

  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    barThickness: 5,
    scales: {
      yAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0}}]
    }
  };

  public barChartLabels = [
    "From: " + this.date.getString(this.date.getDefaultDesde())
    + " to " + this.date.getString(this.date.getDefaultHasta())];

  public barChartType: ChartType = 'bar';

  public barChartLegend = true;

  public barChartData = [
    { data: [48], label: 'Eliminaciones' },
    { data: [65], label: 'Cargas' },
    { data: [28], label: 'Modificaciones' }
  ];

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  ngOnInit() {

  }

  checkDatePickersValues(): void {
    this.desde = this.desde === undefined ? this.date.getDefaultDesde() : this.desde
    this.hasta = this.hasta === undefined ? this.date.getDefaultHasta() : this.hasta
  }

  onClick(): void {

    this.checkDatePickersValues();

    console.log(this.selected_user);
    
    this.barChartData = [
      { data: [1000], label: 'Eliminaciones' },
      { data: [60], label: 'Cargas' },
      { data: [20], label: 'Modificaciones' },
    ];

    console.log(this.desde, this.hasta);
  }

}
