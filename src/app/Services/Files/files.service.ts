import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { QueryHttp } from 'src/app/Interfaces/QueryHttp.interface';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  url: string = "https://ldaw-sistema-contable-8odys.ondigitalocean.app/graphql/";

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getQueryInfo(periodo: any): any {
    return {
      query: `
        mutation fileUpload($file: UploadFileMutationInput!){
          fileUpload(input: $file){
            success
          }
        }`,
      variables: {"file": {"nombre": "texto.txt", "departamento": this.auth.departamentos.join(), "correoCliente": "msr@msr.com", "periodo": periodo}},
      "operationName": "fileUpload"
    }
  }

  getMap() {
    return {
      file: ["variables.file"]
    }
  }

  getFormData(file: File, periodo: any): FormData {
    let fd = new FormData()
    let operations = JSON.stringify(this.getQueryInfo(periodo));
    fd.append('operations', operations)
    fd.append('archivo', file, file.name)
    return fd;
  }

  sendFile(file: File, periodo: any) {
    console.log(this.getFormData(file, periodo))
    return this.http.post(this.url, this.getFormData(file, periodo), { headers: this.auth.generateAuthHeader()})
  }
}
