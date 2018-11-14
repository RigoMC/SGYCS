import { Component, OnInit, ViewChild } from '@angular/core';
import { Comanda } from '../../../interfaces/comanda.interface';
import { ComandaService } from '../../../servicios/comanda.service';
import { Pedido } from '../../../interfaces/pedido.interface';
import { PedidoService } from '../../../servicios/pedido.service';
import { MaterialService } from '../../../servicios/material.service';
import { ProductoService } from '../../../servicios/producto.service';
import { ContadorService } from '../../../servicios/contador.service';
import { AddpedComponent } from './../componentes/addped/addped.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  @ViewChild(AddpedComponent) hijo:AddpedComponent;

  npedido:number = 0;
  totalt:number = 0;
  total:string [] = [];
  list:any [] = [1];
  productosS:string = "";
  materiales:any [] = [];
  productos:any [] = [];
  precios:any [] = [];
  cantidades:any [] = [];
  folioComanda:any ;
  comanda:Comanda = {
    fecha: "",
    pedido: {},
    elaborada: 1
  };

  constructor( private _comandaService:ComandaService, private _pedidoService:PedidoService,
               private _materialService:MaterialService, private _productoService:ProductoService,
               private _contador:ContadorService )
  {
    let hoy = new Date();
    this.comanda.fecha = String(hoy.getDate())+'/'+String(hoy.getMonth()+1)+'/'+String(hoy.getFullYear());

    this._comandaService.nueva(this.comanda)
        .subscribe(data=>{
                            this.folioComanda = data["name"];
                          });

    this._materialService.getMateriales()
        .subscribe(data=>{
                            if (data != null) {
                                this.materiales = data;
                            }else{
                                alert("ERROR type: sm00");
                            }
                          });

    this._productoService.getProductos()
        .subscribe(data=>{
                            if (data != null) {
                                this.productos = data;
                            }else{
                                alert("ERROR type: sp00");
                            }
                          });
  }

  ngOnInit() {
  }

  agregarPed()
  {
    let hcompra = false;

    for (let i = 0; i < this.cantidades.length; i++) {
        if (this.cantidades[i] != 0) {
            hcompra = true;
            break;
        }
    }

    if (hcompra) {
      let pedido:Pedido =
      {
        productos: this.productosS,
        cantidades: String(this.cantidades),
        total: this.total[this.npedido]
      }

      this._contador.restarProductos(this.productosS, String(this.cantidades));

      for (let i = 0; i < this.precios.length; i++) {
        this.precios[i] = 0;
        this.cantidades[i] = 0;
      }
      this.productosS = "";

      this._pedidoService.nuevo( pedido,this.folioComanda )
          .subscribe(data=>{
                              if(data != null){
                                alert("se inserto correctamente");
                                this.npedido++;
                                this.list[this.npedido] = this.npedido+1;
                                this.hijo.recargarLista();
                              }else{
                                alert(data);
                              }
                            });
    }else{
      alert("No hay productos seleccionados.");
    }
  }

  asignarProd(prod:any)
  {
    this.productosS = String(prod);
  }

  asignarC(cantidades:any)
  {
    this.cantidades = cantidades;
  }

  asignarP(precios:any)
  {
    this.precios = precios;
    this.crearTotal();
  }

  crearTotal()
  {
    let total = 0;

    for (let i = 0; i < this.precios.length; i++) {
      let x = this.precios[i] * this.cantidades[i];
      total += x;
    }

    this.total[this.npedido] = String(total);

    this.totalt = 0;

    for (let i = 0; i < this.total.length; i++) {
        this.totalt += Number(this.total[i]);
    }
  }

}
