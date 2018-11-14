import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Pedido } from "../interfaces/pedido.interface";
import 'rxjs/Rx';

@Injectable()
export class PedidoService {

  pedidoURL = "https://sgyc-81627.firebaseio.com/comandas/";

  constructor( private http:Http ) { }

  nuevo( pedido:Pedido , key:string )
  {
    let body = JSON.stringify(pedido); 
    let url = `${ this.pedidoURL }/${ key }/pedido.json`;
    let headers = new Headers({'content-type':'application/json'});

    return this.http.post (url , body , { headers:headers } ).map( res=>{ return res.json() } );
  }

}
