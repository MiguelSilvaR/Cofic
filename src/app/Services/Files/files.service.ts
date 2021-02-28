import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { QueryHttp } from 'src/app/Interfaces/QueryHttp.interface';
import { MutationService } from '../Mutation/mutation.service';
import { auth } from 'src/app/Operations/query';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  url: string = "https://ldaw-sistema-contable-8odys.ondigitalocean.app/graphql/";

  constructor(
    private http: HttpClient,
    private mutation: MutationService
  ) { }

  getQueryInfo(): QueryHttp {
    return {
      query: `
        mutation fileUpload($file: UploadFileMutationInput!){
          fileUpload(input: $file){
            success
          }
        }`,
      variables: { file: { nombre: "prueba.pdf", categoria: "prueba" } },
      "operationName": "fileUpload"
    }
  }

  getMap() {
    return {
      file: ["variables.file"]
    }
  }

  getFormData(file: File): FormData {
    let fd = new FormData()
    let operations = JSON.stringify(this.getQueryInfo());
    fd.append('operations', operations)
    //fd.append('map', JSON.stringify(this.getMap()))
    fd.append('archivo', file, file.name)
    return fd;
  }

  sendFile(file: File) {
    console.log(this.getFormData(file))
    return this.http.post(this.url, this.getFormData(file), { headers: new HttpHeaders({ Authorization: "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im1zckBtc3IuY29tIiwiZXhwIjoxNjE0NDI0Mzg4LCJvcmlnSWF0IjoxNjE0Mzk1NTg4fQ.QiHx41030sjJMbw2YKUTdd3pfusMpQGy81u-JAtyxbg" }) })
  }

  login() {
    this.mutation.executeMutation(this.getLoginOptions({ "username": "msr@msr.com", "password": "skaud234!..DAG" })).subscribe(
      (data) => {
        console.log(data)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  getLoginOptions(usuario: any): any {
    return {
      mutation: auth,
      variables: {
        usuario
      }
    }
  }

}
