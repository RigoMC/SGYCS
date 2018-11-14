import { Component, OnInit } from '@angular/core';
import { MaterialService } from "../../../servicios/material.service";
import { ContadorService } from "../../../servicios/contador.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  materiales:any[] = [];
  material:any;
  memoriak:boolean = false;
  public llave:string;
  nuevo:boolean;

  recargarLista()
  {
    delete this.materiales;
    this._materialService.getMateriales()
        .subscribe( data=>{ this.materiales = data; });
    this.nuevo = false;
    this._cont.rpm();
    this._cont.actualizarPosibles();
  }

  constructor( private _materialService:MaterialService, private _cont:ContadorService )
  {
    this.recargarLista();
  }

  ngOnInit() {
  }

  borrar(key$:string)
  {
    this._materialService.borrarMaterial(key$).subscribe( data=>{ if( data == null ){ delete this.materiales[key$]; } })
  }

  abrirModificar(k:string)
  {
    this.llave = k;
    this.memoriak = !this.memoriak;
  }

  recargar()
  {
    this.memoriak = false;
    this.recargarLista();
    this.recargarLista();
    this._cont.actualizarPosibles();
  }
}
