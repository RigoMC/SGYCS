import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Material } from "../interfaces/material.interface";
import 'rxjs/Rx';

@Injectable()
export class MaterialService {

  materialesURL = "https://sgyc-81627.firebaseio.com/materiales.json";
  materialURL = "https://sgyc-81627.firebaseio.com/materiales";

  constructor( private http:Http ) { }

  nuevoMaterial( material:Material )
  {
    let body = JSON.stringify(material);
    let headers = new Headers({'content-type':'application/json'});

    return this.http.post (this.materialesURL , body , { headers:headers } ).map( res=>{console.log(res.json())} );
  }

  modificarMaterial( material:Material, key$:string )
  {
    let body = JSON.stringify(material);
    let headers = new Headers({'content-type':'application/json'});
    let url = `${ this.materialURL }/${ key$ }.json`;
    return this.http.put (url , body , { headers:headers } ).map( res=>{console.log(res.json())} );
  }

  getMateriales()
  {
    return this.http.get(this.materialesURL).map( res=>res.json() );
  }

  getMaterial(key$)
  {
    let url = `${ this.materialURL }/${ key$ }.json`;
    console.log(url);
    return this.http.get( url ).map( res=>res.json() );
  }

  borrarMaterial(key$:string)
  {
    let url = `${ this.materialURL }/${ key$ }.json`;

    return this.http.delete( url ).map( res=> res.json() )
  }

}
