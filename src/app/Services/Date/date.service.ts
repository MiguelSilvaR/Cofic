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
    return { day: 1 , month: 1 , year: 1970 }
  }

  getString(date :NgbDateStruct){
    return date.year + "-" + date.month.toString().padStart(2,"0") + "-" + date.day.toString().padStart(2,"0");
  }
}
