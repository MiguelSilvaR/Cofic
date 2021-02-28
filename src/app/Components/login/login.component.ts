import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faLock, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../Services/auth/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faUser: IconDefinition = faUser;
  faLock: IconDefinition = faLock;

  user: string = '';
  password: string = '';
  token: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isTokenValid()) {
      this.router.navigate(["/menu"])
    }
  }

  ngOnInit(): void {
    //console.log("Login");
  }

  submit(): void {
    this.authService.login(this.user, this.password).subscribe(
      (data: any) => {
        this.authService.setToken(data['data']['tokenAuth']['token']);
      },
      (err: any) => {
        alert("Usuario o contrasena equivocadas");
      }
    );
  }

}
