import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router) {
  }

  routesAllowed: any = {
    "cliente": [ "menu-files", "menu", "documentacion", "perdido"],
    "services": ["nomina", "contabilidad", "resursoshumanos"],
    "recepcion": ["menu-files", "menu", "administrador", "agregar-usuario", "crear-aviso", "perdido"],
    "operador": ["menu-files", "menu", "operador", "operador-form", "perdido", "update"],
    "supervisor": ["menu-files", "menu", "supervisor", "notificacion", "operador-form", "perdido", "update"],
    "administrador": ["menu-files", "menu", "administrador", "agregar-usuario", "crear-aviso", "files-admin", "operador-form", "notificacion", "perdido", "update"]
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.auth.isTokenValid()) {
      let currentURL = route.url[0].path
      //console.log(this.auth.departamentos, this.auth.rol, currentURL)

      if (this.auth.rol == "cliente" && this.auth.departamentos.includes(currentURL)) {
        return true
      } 
      if (this.routesAllowed[this.auth.rol].includes(currentURL)) {
        //console.log("object")
        return true
      }
      if (this.auth.rol == "cliente" && !this.auth.departamentos.includes(currentURL)) {
        this.router.navigateByUrl("login")
        return false
      }
    }
    this.router.navigateByUrl("login")
    return false;
  }

}
