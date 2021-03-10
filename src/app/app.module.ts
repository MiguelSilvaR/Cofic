import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { LoginComponent } from './Components/login/login.component';
import { TituloComponent } from './Shared/titulo/titulo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuComponent } from './Components/menu/menu.component';
import { MenuFilesComponent } from './Components/menu-files/menu-files.component';
import { TablaComponent } from './Shared/tabla/tabla.component';
import { NominasComponent } from './Components/nominas/nominas.component';
import { ContabilidadComponent } from './Components/contabilidad/contabilidad.component';
import { RecursosHumanosComponent } from './Components/recursos-humanos/recursos-humanos.component';
import { DocumentacionComponent } from './Components/documentacion/documentacion.component';
import { OperadorComponent } from './Components/operador/operador.component';
import { OperadorFormComponent } from './Components/operador-form/operador-form.component';
import { SupervisorComponent } from './Components/supervisor/supervisor.component';
import { NotificacionesComponent } from './Components/notificaciones/notificaciones.component';
import { AdministradorComponent } from './Components/administrador/administrador.component';
import { AgregarUserComponent } from './Components/agregar-user/agregar-user.component';
import { FilesAdminComponent } from './Components/files-admin/files-admin.component';
import { CrearAvisoComponent } from './Components/crear-aviso/crear-aviso.component';
import { GraphQLModule } from './GraphQL/graphql.module';
import { ReportsComponent } from './Components/reports/reports.component';
import { PerdidoComponent } from './Components/perdido/perdido.component';
import { UserModalComponent } from './Components/user-modal/user-modal.component';
import { UpdateFileComponent } from './Components/update-file/update-file.component';
import { EditarUserComponent } from './Components/editar-user/editar-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TituloComponent,
    MenuComponent,
    MenuFilesComponent,
    TablaComponent,
    NominasComponent,
    ContabilidadComponent,
    RecursosHumanosComponent,
    DocumentacionComponent,
    OperadorComponent,
    OperadorFormComponent,
    SupervisorComponent,
    NotificacionesComponent,
    AdministradorComponent,
    AgregarUserComponent,
    FilesAdminComponent,
    CrearAvisoComponent,
    ReportsComponent,
    PerdidoComponent,
    UserModalComponent,
    UpdateFileComponent,
    EditarUserComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ChartsModule,
    FontAwesomeModule,
    FormsModule,
    GraphQLModule,
    HttpClientModule,
    NgxDropzoneModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }