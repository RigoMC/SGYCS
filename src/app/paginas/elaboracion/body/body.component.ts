import { Component, OnInit } from '@angular/core';
import { ComandaService } from './../../../servicios/comanda.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  comandas:any [] = [];
  pedidos:any [] = [];
  memoria:boolean = false;

  constructor( private _comandaService:ComandaService ) {
    this._comandaService.getComandas().subscribe( data => {
                                                            if (data != null) {
                                                                this.comandas = data;
                                                            }
                                                          });
  }

  ngOnInit() {
  }

  cargarPedidos(key:string)
  {
    if (key != "xyz") {
      this.memoria = false;
      let p = this.comandas[key].pedido;
      let ped:any [] = [];

      for (let k in p) {
          ped.push(p[k]);
      }

      this.pedidos = ped;
    }else{
      this.memoria = true;
    }
  }

}
