import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { reportarPerdido } from 'src/app/Operations/mutation';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { MutationService } from 'src/app/Services/Mutation/mutation.service';

@Component({
  selector: 'app-perdido',
  templateUrl: './perdido.component.html',
  styleUrls: ['./perdido.component.scss']
})
export class PerdidoComponent implements OnInit {

  years = new Array(52)
  perdidoForm: FormGroup = new FormGroup({
    "nombre": new FormControl("", Validators.required),
    "periodo": new FormControl("", Validators.required),
    "tipoDoc": new FormControl("", Validators.required),
    "departamento": new FormControl("", Validators.required)
  })

  constructor(
    private mutation: MutationService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getFormValues() {
    return {
      "archivoFaltanteNombre": this.perdidoForm.controls["nombre"].value + "." + this.perdidoForm.controls["tipoDoc"].value,
      "archivoFaltantePeriodo": this.perdidoForm.controls["periodo"].value,
      "archivoFaltanteTipo": this.perdidoForm.controls["tipoDoc"].value,
      "departamento": this.perdidoForm.controls["departamento"].value
    }
  }

  report() {
    this.mutation.executeMutation(
      this.mutation.getOptions(reportarPerdido, { perdido: this.getFormValues() }, { headers: this.auth.generateAuthHeader() })
    ).subscribe(
      (data) => {
        alert("Archivo reportado")
        this.router.navigateByUrl("/")
      },
      (err) => {
        alert("Error")
        this.router.navigateByUrl("/")
      }
    )
  }

  sendInfo() {
    console.log(this.getFormValues())
    this.report()
  }

}
