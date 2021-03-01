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
    "cliente": [ "menu-files", "menu"],
    "services": ["nomina", "contabilidad", "resursoshumanos", "documentacion"],
    "recepcion": ["menu-files", "menu", "administrador", "agregar-usuario", "crear-aviso"],
    "operador": ["menu-files", "menu", "operador", "operador-form"],
    "supervisor": ["menu-files", "menu", "supervisor", "notificacion"],
    "administrador": ["menu-files", "menu", "administrador", "agregar-usuario", "crear-aviso", "files-admin"]
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.auth.isTokenValid()) {
      let currentURL = route.url[0].path
      console.log(this.auth.departamentos, this.auth.rol, currentURL)

      if (this.auth.rol == "cliente" && this.auth.departamentos.includes(currentURL)) {
        return true
      } 
      if (this.routesAllowed[this.auth.rol].includes(currentURL)) {
        return true
      }
      if (this.auth.rol == "cliente" && !this.auth.departamentos.includes(currentURL)) {
        this.router.navigateByUrl("login")
        return false
      }
      return true
    }
    this.router.navigateByUrl("login")
    return false;
  }

}
