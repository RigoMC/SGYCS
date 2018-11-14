import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Comanda } from "../interfaces/comanda.interface";
import 'rxjs/Rx';

@Injectable()
export class ComandaService {

  comandasURL = "https://sgyc-81627.firebaseio.com/comandas.json";
  comandaURL = "https://sgyc-81627.firebaseio.com/comandas";

  constructor( private http:Http ) { }

  nueva( comanda:Comanda )
  {
    let body = JSON.stringify(comanda);
    let headers = new Headers({'content-type':'application/json'});

    return this.http.post (this.comandasURL , body , { headers:headers } ).map( res=>{ return res.json() } );
  }

  modificarComanda( comanda:Comanda, key$:string )
  {
    let body = JSON.stringify(comanda);
    let headers = new Headers({'content-type':'application/json'});
    let url = `${ this.comandaURL }/${ key$ }.json`;
    return this.http.put (url , body , { headers:headers } ).map( res=>{ return res.json()} );
  }

  getComandas()
  {
    return this.http.get(this.comandasURL).map( res=>res.json() );
  }

  getComanda(key$)
  {
    let url = `${ this.comandaURL }/${ key$ }.json`;
    console.log(url);
    return this.http.get( url ).map( res=>res.json() );
  }

  borrarComanda(key$:string)
  {
    let url = `${ this.comandaURL }/${ key$ }.json`;

    return this.http.delete( url ).map( res=> res.json() );
  }

}
