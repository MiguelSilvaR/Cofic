import { Component, OnInit, ViewChild } from '@angular/core';
import { faCalendar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/Services/Date/date.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { QueryService } from 'src/app/Services/Query/query.service';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { getStats, getStatsUser, allUsersAdmin } from 'src/app/Operations/query';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit {

  constructor(
    private date: DateService,
    private query: QueryService,
    private auth: AuthService
  ) { }

  users: any;

  departaments = [
    {
      name: "contabilidad"
    },
    {
      name: "nomina"
    },
    {
      name: "recursoshumanos"
    },
    {
      name: "documentacion"
    }
  ];

  selected_user: any;
  selected_dep: any;
  data: any;

  faCalendar: IconDefinition = faCalendar;
  desde!: NgbDateStruct;
  hasta!: NgbDateStruct;


  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    barThickness: 5,
    scales: {
      yAxes: [{ id: 'y-axis-1', type: 'linear', position: 'left', ticks: { min: 0 } }]
    }
  };

  public barChartLabels = ['Contabilidad', 'Nomina', 'RecursosHumanos', 'Documentacion'];

  public barChartType: ChartType = 'bar';

  public barChartLegend = true;

  public barChartData = [
    { data: [0], label: 'Eliminaciones' },
    { data: [0], label: 'Cargas' },
    { data: [0], label: 'Modificaciones' }
  ];

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  ngOnInit() {
    this.checkDatePickersValues();
    this.getUsers();
  }

  checkDatePickersValues(): void {
    this.desde = this.desde === undefined ? this.date.getDefaultDesde() : this.desde
    this.hasta = this.hasta === undefined ? this.date.getDefaultHasta() : this.hasta
  }

  getStats(): void {
    this.checkDatePickersValues()
    this.query.executeQuery(this.query.getOptions(getStatsUser, "network-only", { fechaInicio: this.getString(this.desde), fechaFinal: this.getString(this.hasta), usuario: this.selected_user },
      { headers: this.auth.generateAuthHeader() })).subscribe(
        (data: any) => {
          this.data = JSON.parse(data.data["getStats"]),
            this.updateChart();
        },
        (err) => console.log(err)
      );
  }

  getUsers(): void {
    this.query.executeQuery(this.query.getOptions(allUsersAdmin, "network-only",
      undefined, { headers: this.auth.generateAuthHeader() })).subscribe(
        (data: any) => {
          let tempArr = data.data.allUsuarios.edges.map(
            (value: any) => {
              return [value.node.username,value.node.id]
            }
          );
          this.users = tempArr;
        },
        (err) => console.log(err)
      )
  }

  getString(date: NgbDateStruct): String {
    return this.date.getString(date);
  }

  onClick(): void {
    if (this.selected_user == null)
      return;
    this.getStats();
  }

  reset(): void {
    this.data = {
      contabilidad: {
        eliminados: 0,
        creados: 0,
        modificados: 0
      },
      nomina: {
        eliminados: 0,
        creados: 0,
        modificados: 0
      },
      recursoshumanos: {
        eliminados: 0,
        creados: 0,
        modificados: 0
      },
      documentacion: {
        eliminados: 0,
        creados: 0,
        modificados: 0
      },
    }
    this.updateChart();
  }

  updateChart(): void {
    this.barChartData = [
      { data: [this.data.contabilidad.eliminados, this.data.nomina.eliminados, this.data.recursoshumanos.eliminados, this.data.documentacion.eliminados], label: 'Eliminaciones' },
      { data: [this.data.contabilidad.creados, this.data.nomina.creados, this.data.recursoshumanos.creados, this.data.documentacion.creados], label: 'Cargas' },
      { data: [this.data.contabilidad.modificados, this.data.nomina.modificados, this.data.recursoshumanos.modificados, this.data.documentacion.modificados], label: 'Modificaciones' }
    ];
  }
}
