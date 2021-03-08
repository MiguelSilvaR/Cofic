import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { updateFile } from 'src/app/Operations/mutation';
import { allClientes } from 'src/app/Operations/query';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { MutationService } from 'src/app/Services/Mutation/mutation.service';
import { QueryService } from 'src/app/Services/Query/query.service';

@Component({
  selector: 'app-update-file',
  templateUrl: './update-file.component.html',
  styleUrls: ['./update-file.component.scss']
})
export class UpdateFileComponent implements OnInit {

  years: any = new Array(52)
  clientes: any = []

  operadorForm: FormGroup = new FormGroup({
    "cliente": new FormControl("", []),
    "periodo": new FormControl("", [Validators.required]),
    "nombre": new FormControl("", [Validators.required]),
    "categoria": new FormControl("", [Validators.required])
  })

  constructor(
    private query: QueryService,
    private auth: AuthService,
    private router: ActivatedRoute,
    private mutation: MutationService,
    private rter: Router
  ) { }

  ngOnInit(): void {
    this.getClientes()
  }

  getClientes() {
    this.query.executeQuery(
      this.query.getOptions(allClientes, "network-only", undefined, { headers: this.auth.generateAuthHeader() })
    ).subscribe(
      (data: any) => {
        console.log(data)
        this.clientes = data.data.allClientes
      },
      (err) => console.log(err)
    )
  }

  getFormValues(): any {
    let id = this.router.snapshot.paramMap.get("id")
    id = id != null ? id : ""
    return {
      "id": decodeURIComponent(id),
      "correoCliente": this.operadorForm.controls["cliente"].value,
      "periodo": parseInt(this.operadorForm.controls["periodo"].value),
      "nombre": this.operadorForm.controls["nombre"].value,
      "categoria": this.operadorForm.controls["categoria"].value
    }
  }

  sendInfo() {
    let filters = this.getFormValues()
    console.log(filters)
    this.mutation.executeMutation(
      this.mutation.getOptions(updateFile, { file: filters }, { headers: this.auth.generateAuthHeader() })
    ).subscribe(
      (data) => {
        alert("Exito al actualizar archivo")
        this.rter.navigateByUrl("/")
      },
      (err) => {
        alert("Error")
        this.rter.navigateByUrl("/")
      }
    )
  }

}
