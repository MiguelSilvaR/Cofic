import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-files',
  templateUrl: './menu-files.component.html',
  styleUrls: ['./menu-files.component.scss']
})
export class MenuFilesComponent implements OnInit {

  departamento!: string | null

  constructor(
    private router: ActivatedRoute
  ) {
    this.departamento = this.router.snapshot.paramMap.get("department")
    console.log(this.departamento)
  }

  ngOnInit(): void {
  }

}
