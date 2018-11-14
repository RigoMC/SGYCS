import { Component, OnInit, Input } from '@angular/core';
import { ProductoService } from "./../../../../servicios/producto.service";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input('id') id:number; //variable que muestra el numero de pedido.
  @Input('p') pedido:any; //objeto de tipo pedido.
  productos:any [] = []; //arreglo que contendra los materiales para poder convertir las llaves en nombres.
  nomprod:string [] = [];//arreglo que contendra los nombres de los productos pedidos.
  cantidades:string [] = [];//arreglo que contendra las cantidades de los productos pedidos.


  constructor( private _productoService:ProductoService ) {
    this._productoService.getProductos().subscribe( data => {if(data != null) this.productos = data; else alert("ERROR"); this.cargarDatos();} );
  }

  ngOnInit() {
  }


  cargarDatos()
  {
    let keys:string [] = this.pedido.productos.split(","); //obtengo las keys de pedidos.
    let cant:string [] = this.pedido.cantidades.split(","); //obtengo las cantidades de los pedidos.

    for (let i = 0; i < cant.length; i++) { //recorro las cantidades
        if (Number(cant[i]) > 0) { //si cantidad es diferente de 0
            this.nomprod.push(this.productos[keys[i]].nombre); //añado el nombre del producto a un arreglo que se usara en el html
            this.cantidades.push(cant[i]); //añado su cantidad a un arreglo que se usara en el html. con esto nombre y cantidad estaran en la misma posicion en diferentes arreglos
        }
    }
  }

}
