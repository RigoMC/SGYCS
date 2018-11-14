import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Producto } from "../interfaces/producto.interface";
import 'rxjs/Rx';

@Injectable()
export class ProductoService {

  productosURL = "https://sgyc-81627.firebaseio.com/productos.json";
  productoURL = "https://sgyc-81627.firebaseio.com/productos";

  constructor( private http:Http ) { }

  nuevoProducto( producto:Producto )
  {
    let body = JSON.stringify(producto);
    let headers = new Headers({'content-type':'application/json'});

    return this.http.post (this.productosURL , body , { headers:headers } ).map( res=>{console.log(res.json())} );
  }

  getProductos()
  {
    return this.http.get(this.productosURL).map( res=>res.json() );
  }

  getProducto(key$)
  {
    let url = `${ this.productoURL }/${ key$ }.json`;
    return this.http.get( url ).map( res=>res.json() );
  }

  borrarProducto(key$:string)
  {
    let url = `${ this.productoURL }/${ key$ }.json`;

    return this.http.delete( url ).map( res=> res.json() )
  }


  modificarProducto( producto:Producto, key$:string )
  {
    let body = JSON.stringify(producto);
    let headers = new Headers({'content-type':'application/json'});
    let url = `${ this.productoURL }/${ key$ }.json`;
    return this.http.put (url , body , { headers:headers } ).map( res=>{ return res.json(); } );
  }

}
