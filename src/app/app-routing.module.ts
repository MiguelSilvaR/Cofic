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

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "menu", component: MenuComponent },
  { path: "menu-files", component: MenuFilesComponent },
  { path: "nomina", component: NominasComponent },
  { path: "contabilidad", component: ContabilidadComponent },
  { path: "recursos-humanos", component: ContabilidadComponent },
  { path: "documentacion", component: DocumentacionComponent },
  { path: "operador", component: OperadorComponent },
  { path: "operador-form", component: OperadorFormComponent },
  { path: "supervisor", component: SupervisorComponent },
  { path: "notificacion", component: NotificacionesComponent },
  { path: "administrador", component: AdministradorComponent },
  { path: "agregar-usuario", component: AgregarUserComponent },
  { path: "crear-aviso", component: CrearAvisoComponent },
  { path: "files-admin", component: FilesAdminComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
