import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Personal } from "../../../../interfaces/personal.interface";
import { PersonalService } from "../../../../servicios/personal.service";

@Component({
  selector: 'app-modify-per',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {

  private personal:Personal = {
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

  @Input('k')  public key:string;

  @Output() detect:EventEmitter<any>;

  constructor( private _personalService:PersonalService )
  {
    this.detect = new EventEmitter();
  }


  cargar()
  {
    this._personalService.getPersonal(this.key).subscribe( data => {
                                                                      if( data != null){
                                                                        this.personal = data;
                                                                      }
                                                                      else{
                                                                        this.personal.nombre = "Error";
                                                                        this.personal.apellidop = "Error";
                                                                        this.personal.apellidom = "Error";
                                                                        this.personal.tel = "Error";
                                                                        this.personal.rfc = "Error";
                                                                        this.personal.direccion = "Error";
                                                                        this.personal.curp = "Error";
                                                                      }
                                                                      console.log(data);
                                                                    });
  }

  ngOnInit() {
    this.cargar();
  }

  guardar(){
    this._personalService.modificarPersonal( this.personal, this.key )
        .subscribe(data=>{});
    this.detect.emit(true);
  }
}
