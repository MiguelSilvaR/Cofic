import { Component } from '@angular/core';
import { AuthService } from './Services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Cofic';

  constructor(
    private auth: AuthService
  ) {
    this.auth.initializeTokenInApp()
  }
}
