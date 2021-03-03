import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faUserPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AdminTableSearchForm } from 'src/app/Interfaces/AdminTableSearchForm.interface';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  faUserPlus: IconDefinition = faUserPlus;

  adminForm: FormGroup = new FormGroup({
    "usuario": new FormControl("", [Validators.required]),
    "estado": new FormControl("", [Validators.required])
  })

  headers:any = [];
  operations:any = [];
  data:any = [];

  constructor() { }

  ngOnInit(): void {
  }

  getFormValues(): AdminTableSearchForm {
    return {
      usuario: this.adminForm.controls["usuario"].value,
      estado: this.adminForm.controls["estado"].value
    }
  }

  sendInfo() {
    console.log(this.getFormValues())
    this.headers = ["1","2","3"]
    this.operations = [true,true,true,true,true]
    this.data = [["1","2","3"],["1","2","3"],["1","2","3"]]
  }

}
