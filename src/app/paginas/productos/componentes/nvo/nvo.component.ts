import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MaterialService } from '../../../../servicios/material.service';

@Component({
  selector: 'app-nvo-prod',
  templateUrl: './nvo.component.html',
  styleUrls: ['./nvo.component.css']
})
export class NvoComponent implements OnInit {

  materiales:any[] = [];
  @Input('mm') mm:any[] = [];
  @Input('cc') cc:any[] = [];
  @Input('m') m:string = "no hay";
  @Input('c') c:string = "0.00";
  material:any = {
    nombre:"x",
    cantidad:"",
    unidad:"Gr"
  }

  @Output() detectm:EventEmitter<string>;
  @Output() detectc:EventEmitter<string>;

  constructor( private _materialService:MaterialService )
  {
    this.detectm = new EventEmitter();
    this.detectc = new EventEmitter();
  }

  ngOnInit() {
    this.cargar();
  }

  cargar()
  {
    this._materialService.getMateriales()
        .subscribe( data=>{ this.materiales = data; });
  }

  recargarMateriales(borrar:Number)
  {
    if(borrar == 0){
      if(this.m == "no hay")
          this.m = this.material.nombre;
      else
          this.m += ","+this.material.nombre;

      if(this.c == "0.00")
          this.c = this.material.cantidad+" "+this.material.unidad;
      else
          this.c += ","+this.material.cantidad+" "+this.material.unidad;

      this.mm = this.m.split(",");
      this.cc = this.c.split(",");
    }

    if ( this.m != "no hay" && this.c != "0.00") {
      this.detectm.emit( this.m );
      this.detectc.emit( this.c );
    }


    this.material.nombre = "x";
    this.material.cantidad = "";
    this.material.unidad = "Gr";
  }

  borrar(i:string)
  {
    let mmm;
    let ccc;
    let posicion;
    delete this.mm[i];
    delete this.cc[i];

    if (this.mm.length != 1) {
      for(let i = 0; i < this.mm.length; i++)
      {
        if(this.mm[i] == undefined)
        {
          if( i != this.mm.length-1)
          {
            posicion = i;
            for(posicion ; posicion < this.mm.length; posicion++)
            {
              if(this.mm[posicion+1] != undefined)
              {
                mmm = this.mm[posicion+1];
                ccc = this.cc[posicion+1];
                this.mm[posicion] = mmm;
                this.cc[posicion] = ccc;
              }
              else
              {
                this.mm.pop();
                this.cc.pop();
                this.m = String(this.mm);
                this.c = String(this.cc);
                break;
              }
            }
          }
          else
          {
            this.mm.pop();
            this.cc.pop();
            this.m = String(this.mm);
            this.c = String(this.cc);
          }
        }
      }
    }else{
      this.mm = new Array();
      this.cc = new Array();
      this.m = "no hay";
      this.c = "0.00";
    }

    this.recargarMateriales(1);
  }

}
