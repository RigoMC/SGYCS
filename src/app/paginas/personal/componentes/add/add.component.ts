import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Personal } from "../../../../interfaces/personal.interface";
import { PersonalService } from "../../../../servicios/personal.service";

@Component({
  selector: 'app-add-per',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  personal:Personal = {
    nombre: "",
    apellidop:"",
    apellidom:"",
    tel:"",
    sexo:"Masculino",
    rfc:"",
    colonia:"Celaya Centro",
    direccion:"",
    curp:""
  }

  @Output() detect:EventEmitter<any>;

  constructor( private _personalService:PersonalService )
  {
    this.detect = new EventEmitter();
  }

  ngOnInit() {
  }

  guardar(){
    this._personalService.nuevoPersonal( this.personal )
        .subscribe(data=>{});

    this.detect.emit(true);
  }
}
