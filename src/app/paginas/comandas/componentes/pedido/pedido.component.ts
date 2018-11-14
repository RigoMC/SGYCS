import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  @Input('n') pedido:number;
  @Input('t') total:string;


  constructor() {

  }

  ngOnInit() {
    this.total = "0";
  }

}
