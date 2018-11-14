import { Component, OnInit } from '@angular/core';
import { Personal } from "../../../interfaces/personal.interface";
import { PersonalService } from "../../../servicios/personal.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  personales:any[] = [];
  personal:any;
  memoriak:boolean = false;
  public llave:string;
  nuevo:boolean;

  recargarLista()
  {
    delete this.personales;
    this._personalService.getPersonales()
        .subscribe( data=>{ this.personales = data; });
    this.nuevo = false;
  }

  constructor( private _personalService:PersonalService )
  {
    this.recargarLista();
  }

  ngOnInit() {
  }

  borrar(key$:string)
  {
    this._personalService.borrarPersonal(key$).subscribe( data=>{ if( data == null ){ delete this.personales[key$]; } })
  }

  abrirModificar(k:string)
  {
    if(!this.memoriak)
    {
      this.llave = k;
    }
    this.memoriak = !this.memoriak;
  }

  recargar()
  {
    this.memoriak = false;
    this.recargarLista();
    this.recargarLista();
  }
}
