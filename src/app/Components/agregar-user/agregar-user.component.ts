import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgregarUserForm } from 'src/app/Interfaces/AgregarUserForm.interface';

@Component({
  selector: 'app-agregar-user',
  templateUrl: './agregar-user.component.html',
  styleUrls: ['./agregar-user.component.scss']
})
export class AgregarUserComponent implements OnInit {

  agregarUser: FormGroup = new FormGroup({
    "user": new FormControl("", [Validators.required]),
    "razonSocial": new FormControl("", [Validators.required]),
    "nombre": new FormControl("", [Validators.required]),
    "rfc": new FormControl("", [Validators.required]),
    "phono": new FormControl("", [Validators.required]),
    "domicilio": new FormControl("", [Validators.required]),
    "correo": new FormControl("", [Validators.required, Validators.email]),
    "nomina": new FormControl(false, []),
    "conta": new FormControl(false, []),
    "rh": new FormControl(false, []),
    "activo": new FormControl(false, [Validators.required]),
  })

  constructor() { }
  
  ngOnInit(): void {
  }
  
  getFormValues(): AgregarUserForm {
    return {
      "user": this.agregarUser.controls["user"].value,
      "razonSocial": this.agregarUser.controls["razonSocial"].value,
      "nombre": this.agregarUser.controls["nombre"].value,
      "rfc": this.agregarUser.controls["rfc"].value,
      "phono": this.agregarUser.controls["phono"].value,
      "domicilio": this.agregarUser.controls["domicilio"].value,
      "correo": this.agregarUser.controls["correo"].value,
      "nomina": this.agregarUser.controls["nomina"].value,
      "conta": this.agregarUser.controls["conta"].value,
      "rh": this.agregarUser.controls["rh"].value,
      "activo": this.agregarUser.controls["activo"].value
    }
  }

  sendInfo() {
    console.log(this.getFormValues())
  }

}
