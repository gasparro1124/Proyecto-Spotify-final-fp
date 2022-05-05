import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-menu-boton',
  templateUrl: './menu-boton.component.html',
  styleUrls: ['./menu-boton.component.scss']
})
export class MenuBotonComponent implements OnInit {

  @Input() descripcion = ""
  @Input() icon= ""
  @Input() seleccionado = false

  @Output()
  click = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.click.emit()
  }

}
