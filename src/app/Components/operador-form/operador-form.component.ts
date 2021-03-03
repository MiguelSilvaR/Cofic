import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QueryOptions } from '@apollo/client';
import { OperadorForm } from 'src/app/Interfaces/OperadorForm.interface';
import { getFile } from 'src/app/Operations/query';
import { FilesService } from 'src/app/Services/Files/files.service';
import { QueryService } from 'src/app/Services/Query/query.service';

@Component({
  selector: 'app-operador-form',
  templateUrl: './operador-form.component.html',
  styleUrls: ['./operador-form.component.scss']
})
export class OperadorFormComponent implements OnInit {

  files: File[] = [];

  operadorForm: FormGroup = new FormGroup({
    "cliente": new FormControl("", [Validators.required]),
    "periodo": new FormControl("", [Validators.required]),
    "tipoDoc": new FormControl("", [Validators.required])
  })

  constructor(
    private _files: FilesService,
    private query: QueryService
  ) { }

  ngOnInit(): void {
    this._files.login()
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
      "periodo": this.operadorForm.controls["periodo"].value,
      "tipoDoc": this.operadorForm.controls["tipoDoc"].value
    }
  }

  sendInfo() {
    console.log(this.getFormValues())
    this._files.sendFile(this.files[0]).subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    )
  }

  getFileOptions(): QueryOptions {
    return {
      query: getFile,
      variables: {
        name: "Convocatoria-TTP-2021.pdf"
      },
      fetchPolicy: "network-only",
      context: {
        headers: new HttpHeaders({
          Authorization: "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im1zckBtc3IuY29tIiwiZXhwIjoxNjE0NDI0Mzg4LCJvcmlnSWF0IjoxNjE0Mzk1NTg4fQ.QiHx41030sjJMbw2YKUTdd3pfusMpQGy81u-JAtyxbg"
        })
      }
    }
  }

  getFile() {
    this.query.executeQuery(this.getFileOptions()).subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    )
  }

}
