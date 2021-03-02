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
