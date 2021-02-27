import { Component, OnInit } from '@angular/core';
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

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    console.log("Login");
  }
  
  submit(): void{
    console.log("Submit");
    this.authService.login(this.user, this.password).subscribe(
      (data :any ) => {
        console.log(data);
        console.log(data['data']['tokenAuth']['token']);
        this.authService.setToken(data['data']['tokenAuth']['token']);
      },
      (err :any) => {
        console.log("Credenciales invalidas");
        alert("Usuario o contrasena equivocadas");
      }
      );
  }

}
