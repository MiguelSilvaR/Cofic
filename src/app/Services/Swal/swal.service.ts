import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  confirmationSwal(title: any, text: any, icon: any):Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: "NO"
    })
  }

  messageSwal(icon: any, title: any, text: any): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      icon,
      title,
      text
    })
  }

  waitingSwal(text: any): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      allowOutsideClick: false,
      icon: "info",
      text
    });
  }

  swalQueue(modals: (string | SweetAlertOptions<any, any>)[]): Promise<unknown> {
    return Swal.queue(modals)
  }

  loadingSwal(): void {
    Swal.showLoading()
  }

  closeSwal(): void {
    Swal.close();
  }
}
