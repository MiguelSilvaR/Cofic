import { Component, OnInit } from '@angular/core';
import { faCalendar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-documentacion',
  templateUrl: './documentacion.component.html',
  styleUrls: ['./documentacion.component.scss']
})
export class DocumentacionComponent implements OnInit {

  faCalendar: IconDefinition = faCalendar;
  desde!: NgbDateStruct;
  hasta!: NgbDateStruct;

  headers:any = [];
  operations:any = [];
  data:any = [];

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.headers = ["1","2","3"]
    this.operations = [true,true,true,true,true]
    this.data = [["1","2","3"],["1","2","3"],["1","2","3"]]
  }

}
