import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition, faDownload, faTrash, faCheckCircle, faSearch, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  @Input() headers!: any[];
  @Input() operations!: boolean[];
  @Input() data!:any[];

  faDownload: IconDefinition = faDownload
  faTrash: IconDefinition = faTrash
  faCheckCircle: IconDefinition = faCheckCircle
  faSearch: IconDefinition = faSearch
  faPen: IconDefinition = faPen

  constructor() { }

  ngOnInit(): void {
  }

}
