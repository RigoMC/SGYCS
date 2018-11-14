import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Material } from "../../../../interfaces/material.interface";
import { MaterialService } from "../../../../servicios/material.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  material:Material = {
    nombre: "",
    descripcion: "",
    cantidad: "",
    unidad: "Kg",
    relacion: ""
  }

  @Output() detect:EventEmitter<any>;

  constructor( private _materialService:MaterialService )
  {
    this.detect = new EventEmitter();
  }

  ngOnInit() {
  }

  guardar(){
    this._materialService.nuevoMaterial( this.material )
        .subscribe(data=>{});

    this.detect.emit(true);
  }
}
