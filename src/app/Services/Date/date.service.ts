import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getDefaultHasta(): NgbDateStruct {
    let today = new Date();
    return { day: today.getDate(), month: today.getMonth() + 1, year: today.getFullYear() }
  }
  
  getDefaultDesde(): NgbDateStruct {
    return { day: 0 , month: 0 , year: 0 }
  }
}
