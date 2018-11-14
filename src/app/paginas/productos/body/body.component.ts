import { Component, OnInit } from '@angular/core';
import { ProductoService } from "../../../servicios/producto.service";
import { MaterialService } from "../../../servicios/material.service";
import { ContadorService } from "../../../servicios/contador.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  productos:any [] = [];
  materiales:any [] = [];
  nuevo = false;
  memoria:boolean = false;
  public llave:string;


  recargarLista()
  {
    delete this.productos;
    this._productoService.getProductos()
        .subscribe( data=>{ this.productos = data; });
    this._materialService.getMateriales()
        .subscribe( data=>{ this.materiales = data; });
    this.nuevo = false;
  }

  constructor( private _productoService:ProductoService, private _materialService:MaterialService, private _cont:ContadorService )
  {
    this.recargarLista();
    this.recargarLista();
  }

  ngOnInit() {
  }

  recargar(x)
  {
    this.memoria = false;
    if ( x != null) {
      this.productos[this.llave] = x;
    }
  }

  borrar(key$:string)
  {
    this._productoService.borrarProducto(key$).subscribe( data=>{ if( data == null ){ delete this.productos[key$]; } })
  }

  abrirModificar(k:string)
  {
    if(!this.memoria)
    {
      this.llave = k;
    }
    this.memoria = !this.memoria;
  }

  traductor(x:string)
  {
    let array = x.split(",");
    let cadena:string = "";

    if (JSON.stringify(this.materiales) != "[]") {
      for (let i = 0; i < array.length; i++) {
        let m = this.materiales[array[i]];
        if(cadena == "")
          cadena = m.nombre;
        else
          cadena += ","+m.nombre;
      }
    }

    return cadena;
  }
}
