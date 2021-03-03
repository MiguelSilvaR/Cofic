<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OperadorForm } from 'src/app/Interfaces/OperadorForm.interface';
import { FilesService } from 'src/app/Services/Files/files.service';
import { QueryService } from 'src/app/Services/Query/query.service';

@Component({
  selector: 'app-operador-form',
  templateUrl: './operador-form.component.html',
  styleUrls: ['./operador-form.component.scss']
})
export class OperadorFormComponent implements OnInit {

  files: File[] = [];
  years: any = new Array(52)

  operadorForm: FormGroup = new FormGroup({
    "cliente": new FormControl("", [Validators.required]),
    "periodo": new FormControl("", [Validators.required]),
    "tipoDoc": new FormControl("", [Validators.required])
  })

  constructor(
    private _files: FilesService  ) { }

  ngOnInit(): void {
    console.log(this.operadorForm.controls['cliente'].invalid)
  }

  onSelect(event: any) {
    if (this.files.length !== 0)
      this.files.pop()
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  getFormValues(): OperadorForm {
    return {
      "cliente": this.operadorForm.controls["cliente"].value,
      "periodo": parseInt(this.operadorForm.controls["periodo"].value),
      "tipoDoc": this.operadorForm.controls["tipoDoc"].value
    }
  }

  sendInfo() {
    console.log(this.getFormValues())
    let filters = this.getFormValues()
    this._files.sendFile(this.files[0], filters.periodo ).subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    )
  }

}
=======
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OperadorForm } from 'src/app/Interfaces/OperadorForm.interface';
import { allClientes } from 'src/app/Operations/query';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { FilesService } from 'src/app/Services/Files/files.service';
import { QueryService } from 'src/app/Services/Query/query.service';

@Component({
  selector: 'app-operador-form',
  templateUrl: './operador-form.component.html',
  styleUrls: ['./operador-form.component.scss']
})
export class OperadorFormComponent implements OnInit {

  files: File[] = [];
  years: any = new Array(52)
  clientes: any = []

  operadorForm: FormGroup = new FormGroup({
    "cliente": new FormControl("", [Validators.required]),
    "periodo": new FormControl("", [Validators.required]),
    "tipoDoc": new FormControl("", [Validators.required])
  })

  constructor(
    private _files: FilesService,
    private query: QueryService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.getClientes()
  }

  onSelect(event: any) {
    if (this.files.length !== 0)
      this.files.pop()
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
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

  getFormValues(): OperadorForm {
    return {
      "cliente": this.operadorForm.controls["cliente"].value,
      "periodo": parseInt(this.operadorForm.controls["periodo"].value),
      "tipoDoc": this.operadorForm.controls["tipoDoc"].value
    }
  }

  sendInfo() {
    console.log(this.files[0].name)
    let filters = this.getFormValues()
    this._files.sendFile(this.files[0], filters.periodo, filters.cliente ).subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    )
  }

}
>>>>>>> e9ad91d9140f9026ae09732535edd3d30e027807
