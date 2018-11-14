import { Component, OnInit } from '@angular/core';
import { ComandaService } from '../../../servicios/comanda.service';
import { ProductoService } from '../../../servicios/producto.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  comandas:any [] = [];
  fechas:String [] = [];
  pedidos:String [] = [];
  productos:any [] = [];
  diamv:String = "sin datos";
  gananciasT:number = 0;
  gananciasD:number = 0;
  productomv:String = "sin datos";
  fechaDelDia:string;

  constructor( private _comandaService:ComandaService, private _productoService:ProductoService )
  {
    let hoy = new Date();
    let dd = String(hoy.getDate());
    let mm = String(hoy.getMonth()+1); //hoy es 0!
    let yyyy = String(hoy.getFullYear());
    let h = dd+'/'+mm+'/'+yyyy;

    this.fechaDelDia = h;

    this.cargarLista();
  }

  ngOnInit() {

  }

  cargarLista()
  {
    this._comandaService.getComandas().subscribe( data => {
                                                              if(data != null)
                                                                this.comandas = data;
                                                          });
    this._productoService.getProductos().subscribe( data => {
                                                              if(data != null)
                                                                this.productos = data;
                                                          });
  }

  llenar()
  {
    this.gananciasT = 0;
    this.gananciasD = 0;
    let comandas = this.comandas;
    let fechas:string [] = [];
    let totales:any [] = [];
    let totalesD:any [] = [];
    let prod:string [] = [];
    let cantprod:string [] = [];
    let totalesdia:any [] = [];


    for (let key in comandas) {

      if (comandas[key].pedido != null) {
        fechas.push(comandas[key].fecha);

        for (let k in comandas[key].pedido) {
          totales.push(comandas[key].pedido[k].total);

          if (this.fechaDelDia == comandas[key].fecha) {
              totalesD.push(comandas[key].pedido[k].total);
          }

          prod.push(comandas[key].pedido[k].productos);
          cantprod.push(comandas[key].pedido[k].cantidades);

          if (totalesdia[String(comandas[key].fecha)] != null) {
              totalesdia[String(comandas[key].fecha)] = comandas[key].pedido[k].total;
          }else{
              totalesdia[String(comandas[key].fecha)] += comandas[key].pedido[k].total;
          }

        }

      }

    }

    this.gananciasTm(totales);
    this.gananciasDm(totalesD);
    this.productoMv(prod[0], cantprod);
    this.diaMv(this.sinRedundancia(fechas));
  }

  diaMv(x:any){
    let fec = "";
    let cant = 0;
    for (let key in x) {
        if(cant == 0){
          fec = String(key);
          cant = x[key];
        }
        if (cant < Number(x[key])) {
          fec = String(key);
          cant = x[key];
        }
    }
    if (fec != "" && cant != 0) {
      this.diamv = fec+" No. comandas: "+cant;
    }else{
      this.diamv = "sin datos";
    }

  }

  productoMv(x,y){
    if (x != null && y != null) {
      let xx = x.split(",");
      let arrpos:any [] = [];
      for (let i = 0; i < xx.length; i++) {
          arrpos[String(xx[i])] = 0;
      }

      for (let i = 0; i < y.length; i++) {
          let yy = y[i].split(",");
          for (let j = 0; j < yy.length; j++) {
              arrpos[xx[j]] += Number(yy[j]);
          }
      }

      let cant = 0;
      let fec = "";

      for (let key in arrpos) {
          if(cant == 0){
            fec = this.productos[key].nombre;
            cant = arrpos[key];
          }
          if (cant < Number(arrpos[key])) {
            fec = this.productos[key].nombre;
            cant = arrpos[key];
          }
      }
      if (fec != "" && cant != 0) {
        this.productomv = fec+" con: "+cant;
      }else{
        this.productomv = "sin datos";
      }
    }
  }

  gananciasDm(x){
    for (let i = 0; i < x.length; i++) {
        this.gananciasD += Number(x[i]);
    }
  }

  gananciasTm(x:any){
    for (let i = 0; i < x.length; i++) {
        this.gananciasT += Number(x[i]);
    }
  }

  sinRedundancia( array:string [] )
  {
    let array2:string [] = [];
    let c = 0;
    for (let i = 0; i < array.length; i++)
    {
        for (let j = 0; j < array.length; j++)
        {
          if (array2[String(array[i])] == null){
            array2[String(array[i])] = 1;
          }else{
            array2[String(array[i])]++;
          }
        }
        c++;
    }

    for (let key in array2) {
        array2[key] = String(Number(array2[key])/c);
    }

    return array2;
  }


  borrarComanda(c:string)
  {
    this._comandaService.borrarComanda(c).subscribe( data=>{
                                                            if( data == null ){
                                                                delete this.comandas[c];
                                                                this.llenar();
                                                              }
                                                            });
  }
}
