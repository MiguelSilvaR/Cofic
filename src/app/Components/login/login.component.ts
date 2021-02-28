import { Component, OnInit } from '@angular/core';
import { faUser, faLock, IconDefinition } from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit(): void {
  }

}
