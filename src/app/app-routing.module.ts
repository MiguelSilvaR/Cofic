import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorComponent } from './Components/administrador/administrador.component';
import { AgregarUserComponent } from './Components/agregar-user/agregar-user.component';
import { ContabilidadComponent } from './Components/contabilidad/contabilidad.component';
import { CrearAvisoComponent } from './Components/crear-aviso/crear-aviso.component';
import { DocumentacionComponent } from './Components/documentacion/documentacion.component';
import { FilesAdminComponent } from './Components/files-admin/files-admin.component';
import { LoginComponent } from './Components/login/login.component';
import { MenuFilesComponent } from './Components/menu-files/menu-files.component';
import { MenuComponent } from './Components/menu/menu.component';
import { NominasComponent } from './Components/nominas/nominas.component';
import { NotificacionesComponent } from './Components/notificaciones/notificaciones.component';
import { OperadorFormComponent } from './Components/operador-form/operador-form.component';
import { OperadorComponent } from './Components/operador/operador.component';
import { SupervisorComponent } from './Components/supervisor/supervisor.component';
import { AuthGuard } from './Guard/Auth/auth.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "menu", component: MenuComponent, canActivate: [AuthGuard] },
  { path: "menu-files", component: MenuFilesComponent, canActivate: [AuthGuard] },
  { path: "nomina", component: NominasComponent, canActivate: [AuthGuard] },
  { path: "contabilidad", component: ContabilidadComponent, canActivate: [AuthGuard] },
  { path: "recursos-humanos", component: ContabilidadComponent, canActivate: [AuthGuard] },
  { path: "documentacion", component: DocumentacionComponent, canActivate: [AuthGuard] },
  { path: "operador", component: OperadorComponent, canActivate: [AuthGuard] },
  { path: "operador-form", component: OperadorFormComponent, canActivate: [AuthGuard] },
  { path: "supervisor", component: SupervisorComponent, canActivate: [AuthGuard] },
  { path: "notificacion", component: NotificacionesComponent, canActivate: [AuthGuard] },
  { path: "administrador", component: AdministradorComponent, canActivate: [AuthGuard] },
  { path: "agregar-usuario", component: AgregarUserComponent, canActivate: [AuthGuard] },
  { path: "crear-aviso", component: CrearAvisoComponent, canActivate: [AuthGuard] },
  { path: "files-admin", component: FilesAdminComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
