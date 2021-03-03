import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgregarUserForm } from 'src/app/Interfaces/AgregarUserForm.interface';
import { nuevoUser } from 'src/app/Operations/mutation';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { MutationService } from 'src/app/Services/Mutation/mutation.service';

@Component({
  selector: 'app-agregar-user',
  templateUrl: './agregar-user.component.html',
  styleUrls: ['./agregar-user.component.scss']
})
export class AgregarUserComponent implements OnInit {

  operador: boolean = false
  admin: boolean = false
  supervisor: boolean = false

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
    "radio": new FormControl("", [Validators.required]),
    "password": new FormControl("", [Validators.required])
  })

  constructor(
    private mutation: MutationService,
    private auth: AuthService
  ) { }

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
      "activo": this.agregarUser.controls["activo"].value,
      "radio": this.agregarUser.controls["radio"].value,
      "password": this.agregarUser.controls["password"].value
    }
  }

  sendInfo() {
    this.mutation.executeMutation(
      this.mutation.getOptions(nuevoUser,{ user: this.buildVariables(this.getFormValues()) },
      { headers: this.auth.generateAuthHeader() })
    ).subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    )
  }

  buildVariables(info: AgregarUserForm) {
    let departamento = []
    info.conta ? departamento.push("contabilidad") : false 
    info.nomina ? departamento.push("nomina") : false 
    info.rh ? departamento.push("recursoshumanos") : false 
    if (this.operador) {
      return {
        rol: info.user,
        email: info.correo,
        password: info.password,
        departamento: info.radio,
        activo: info.activo
      }
    } else if (this.admin) {
      return {
        rol: info.user,
        email: info.correo,
        password: info.password,
        activo: info.activo
      }
    } else if (this.supervisor) {
      return {
        rol: info.user,
        email: info.correo,
        password: info.password,
        departamento: departamento.join(),
        activo: info.activo
      }
    }else {
      return {
        rol: info.user,
        razonSocial: info.razonSocial,
        nombreContacto: info.nombre,
        rfc: info.rfc,
        telefono: info.phono,
        domicilio: info.domicilio,
        email: info.correo,
        password: info.password,
        departamento: departamento.join(),
        activo: info.activo
      }
    }
  }

  onChange(value: any, user: any) {
    if (user == "operador") {
      this.operador = true
    } else {
      if (user == "supervisor") {
        this.supervisor = true
      } else {
        if (user == "administrador" || user == "recepcion") {
          this.admin = true
        } else{
          this.admin = false
        }
        this.supervisor = false
      }
      this.operador = false
    }
  }

}
