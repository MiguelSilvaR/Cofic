import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { nuevoAnuncio } from 'src/app/Operations/mutation';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { MutationService } from 'src/app/Services/Mutation/mutation.service';

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

  constructor(
    private mutation: MutationService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  getValues() {
    return {
      tipoUsuario: this.crearAviso.controls["user"].value,
      notificacion: this.crearAviso.controls["mensaje"].value
    }
  }

  sendAnnounce(): void {
    console.log(this.getValues())
    this.mutation.executeMutation(this.mutation.getOptions(nuevoAnuncio, 
      { anuncio: this.getValues() }, 
      { headers: this.auth.generateAuthHeader() })).subscribe(
        (data) => {
          console.log(data)
          alert("Mensaje enviado con éxito")
        },
        (err) => console.log(err)
      )

  }

}
