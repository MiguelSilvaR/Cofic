import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() accion = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  emitAction(msg: string, element: any) {
    let infoAccion = [msg, element]
    this.accion.emit(JSON.stringify(infoAccion))
  }

}
