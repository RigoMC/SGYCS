import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Material } from "../../../../interfaces/material.interface";
import { MaterialService } from "../../../../servicios/material.service";

@Component({
  selector: 'app-modify-alm',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {
  private material:Material = {
    nombre: "",
    descripcion: "",
    cantidad: "",
    relacion: "",
    unidad: ""
  }

  @Input('k') key:string;
  @Output() detect:EventEmitter<any>;

  constructor( private _materialService:MaterialService )
  {
    this.detect = new EventEmitter();
  }

  cargar()
  {
    this._materialService.getMaterial(this.key).subscribe( data => {
                                                                        if( data != null){
                                                                          this.material = data;
                                                                        }
                                                                        else{
                                                                          this.material.nombre = "Error";
                                                                          this.material.descripcion = "Error";
                                                                          this.material.cantidad = "0";
                                                                          this.material.unidad = "";
                                                                        }
                                                                      });
  }

  ngOnInit() {
    this.cargar();
  }

  guardar(){
    this._materialService.modificarMaterial( this.material, this.key )
        .subscribe(data=>{});
    this.detect.emit(true);
  }
}
