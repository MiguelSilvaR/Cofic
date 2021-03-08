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

  getQueryInfo(periodo: any, email:any, file: File, categoria: any): any {
    return {
      query: `
        mutation fileUpload($file: UploadFileMutationInput!){
          fileUpload(input: $file){
            success
          }
        }`,
      variables: {"file": {"nombre": file.name, "departamento": this.auth.rol == "administrador" ? "documentacion" : this.auth.departamentos.join(), "correoCliente": email, "periodo": periodo, "categoria": categoria}},
      "operationName": "fileUpload"
    }
  }

  getMap() {
    return {
      file: ["variables.file"]
    }
  }

  getFormData(file: File, periodo: any, email: any, categoria: any): FormData {
    let fd = new FormData()
    let operations = JSON.stringify(this.getQueryInfo(periodo,email, file, categoria));
    fd.append('operations', operations)
    fd.append('archivo', file, file.name)
    return fd;
  }

  sendFile(file: File, periodo: any, email: any, categoria: any) {
    console.log(this.getFormData(file, periodo, email, categoria))
    return this.http.post(this.url, this.getFormData(file, periodo, email, categoria), { headers: this.auth.generateAuthHeader()})
  }
}
