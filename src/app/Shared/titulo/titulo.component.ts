import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {

  isLoggedIn!: any

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.myObservable.value
    this.auth.myObservable$.subscribe(
      (value) => {
        console.log("He cambiado ", value)
        this.isLoggedIn = value
      },
      (err) => {
        console.log(err)
      }
    )
  }

  logout() {
    this.auth.logout()
    this.router.navigateByUrl("login")
  }

}
