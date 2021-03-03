import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-aviso',
  templateUrl: './crear-aviso.component.html',
  styleUrls: ['./crear-aviso.component.scss']
})
export class CrearAvisoComponent implements OnInit {

  crearAviso: FormGroup = new FormGroup({
    "user": new FormControl("", [Validators.required]),
    "mensaje": new FormControl("", [Validators.required])
  })

  constructor() { }

  ngOnInit(): void {
  }

  getValues() {
    return {
      user: this.crearAviso.controls["user"].value,
      mensaje: this.crearAviso.controls["mensaje"].value
    }
  }

  sendAnnounce(): void {
    console.log(this.getValues())
  }

}
