import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { updateUser } from 'src/app/Operations/mutation';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { MutationService } from 'src/app/Services/Mutation/mutation.service';

@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.scss']
})
export class EditarUserComponent implements OnInit {

  editarUser: FormGroup = new FormGroup({
    "correo": new FormControl("", [Validators.required]),
    "password": new FormControl("", [Validators.required])
  })

  constructor(
    private mutation: MutationService,
    private auth: AuthService,
    private rter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getValues() {
    let id = this.rter.snapshot.paramMap.get("id")
    id = id != null ? id : ""
    return {
      "id": decodeURIComponent(id),
      "email": this.editarUser.controls["correo"].value,
      "password": this.editarUser.controls["password"].value
    }
  }

  sendInfo() {
    let filters = this.getValues()
    console.log(filters)
    this.mutation.executeMutation(
      this.mutation.getOptions(updateUser, { usuarioCliente: filters }, { headers: this.auth.generateAuthHeader() })
    ).subscribe(
      (data) => {
        alert("Exito al actualizar user")
        this.router.navigateByUrl("/")
      },
      (err) => {
        alert("Error")
        this.router.navigateByUrl("/")
      }
    )
  }

}
