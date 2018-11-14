import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ComandaService } from './../../../../servicios/comanda.service';

@Component({
  selector: 'app-barraped',
  templateUrl: './barraped.component.html',
  styleUrls: ['./barraped.component.css']
})
export class BarrapedComponent implements OnInit {

  comandas:string [] = [];
  comandasC:any [] = [];
  llave:string = "";

  @Output() detect:EventEmitter<any>;
  @Output() detect2:EventEmitter<any>;

  constructor( private _comandaService:ComandaService )
  {
    this.detect = new EventEmitter();
    this.detect2 = new EventEmitter();

    this._comandaService.getComandas().subscribe(data => {
                                                            if (data != null) {
                                                                this.revisar(data);
                                                                this.comandasC = data;
                                                            }
                                                          });
  }

  ngOnInit() {
  }

  emitirComanda(k:string)
  {
    this.llave = k;
    this.detect.emit(k);
  }


  elaborar()
  {
    this.comandasC[this.llave].elaborada = 0;
    this._comandaService.modificarComanda(this.comandasC[this.llave], this.llave).subscribe( data => {});

    this.revisar(this.comandasC);

    this.llave = this.comandas[0];

    if(this.comandas.length != 0){
        console.log("aun hay");
        this.detect2.emit(this.comandas[0]);
    }else{
        this.detect2.emit("xyz");
    }

  }


  revisar(x)
  {
    let arr:string [] = []
    for (let k in x) {
        if (x[k].elaborada == 1) {
            arr.push(k);
        }
    }
    this.comandas = arr;
  }

  contarPed(x){
    let cont = 0;

    let ped = this.comandasC[x].pedido;

    for (let k in ped) {
        cont++;
    }

    return cont;
  }
}
