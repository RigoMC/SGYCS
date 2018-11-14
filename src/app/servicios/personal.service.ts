import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Personal } from "../interfaces/personal.interface";
import 'rxjs/Rx';

@Injectable()
export class PersonalService {

  personalesURL = "https://sgyc-81627.firebaseio.com/personal.json";
  personalURL = "https://sgyc-81627.firebaseio.com/personal";

  constructor( private http:Http ) { }

  nuevoPersonal( personal:Personal )
  {
    let body = JSON.stringify(personal);
    let headers = new Headers({'content-type':'application/json'});

    return this.http.post (this.personalesURL , body , { headers:headers } ).map( res=>{console.log(res.json())} );
  }

  modificarPersonal( personal:Personal, key$:string )
  {
    let body = JSON.stringify(personal);
    let headers = new Headers({'content-type':'application/json'});
    let url = `${ this.personalURL }/${ key$ }.json`;
    return this.http.put (url , body , { headers:headers } ).map( res=>{console.log(res.json())} );
  }

  getPersonales()
  {
    return this.http.get(this.personalesURL).map( res=>res.json() );
  }

  getPersonal(key$)
  {
    let url = `${ this.personalURL }/${ key$ }.json`;
    return this.http.get( url ).map( res=>res.json() );
  }

  borrarPersonal(key$:string)
  {
    let url = `${ this.personalURL }/${ key$ }.json`;

    return this.http.delete( url ).map( res=> res.json() )
  }
}
