import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Producto } from "../../../../interfaces/producto.interface";
import { ProductoService } from "../../../../servicios/producto.service";
import { MaterialService } from "../../../../servicios/material.service";
import { ContadorService } from "../../../../servicios/contador.service";

@Component({
  selector: 'app-add-prod',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  cargadom:boolean = false;
  cargadoc:boolean = false;
  materiales:any [] = [];
  producto:Producto =
  {
    nombre: "",
    descripcion: "",
    materiales: "",
    cantidades: "",
    precio: "",
    posible: ""
  }

  @Output() detect:EventEmitter<any>;
  constructor( private _productoService:ProductoService, private _materialService:MaterialService, private _contador:ContadorService)
  {
    this.detect = new EventEmitter();

    this._materialService.getMateriales()
        .subscribe( data=>{ this.materiales = data; });
  }

  ngOnInit() {
  }

  cargarStringm( cadena:string )
  {
    this.producto.materiales = cadena;
    console.log(cadena);
    this.revisar();
  }

  cargarStringc( cadena:string )
  {
    this.producto.cantidades = cadena;
    this.revisar();
  }

  revisar()
  {
    if(this.producto.materiales != "")
        this.cargadom = true;

    if(this.producto.cantidades != "")
        this.cargadoc = true;
  }


  guardar()
  {
    let x = this.crearPosible();
    if (x) {
      this._productoService.nuevoProducto(this.producto).subscribe(data=>{});
      this.detect.emit(true);
    }
    else{
      alert("ERROR type:scp0"); //sIN cANTIDAD pOSIBLE.
    }
  }

  crearPosible():boolean
  {
    let x = this.producto.materiales;
    let y = this.producto.cantidades;

    this.producto.posible = String(this._contador.crearPosible( x,y ));

    if (this.producto.posible != "")
      return true;
    else
      return false;
  }

}
