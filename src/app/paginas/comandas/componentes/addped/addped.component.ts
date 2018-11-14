import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductoService } from '../../../../servicios/producto.service';

@Component({
  selector: 'app-addped',
  templateUrl: './addped.component.html',
  styleUrls: ['./addped.component.css']
})
export class AddpedComponent implements OnInit {

  //eventos para mandar al componente padre los datos del pedido
  @Output() detectc:EventEmitter<any>;
  @Output() detectp:EventEmitter<any>;
  @Output() detectprod:EventEmitter<any>;

  //boleanos para activar algunas alertas
  nada=false;

  //array que contiene los productos del pedido
  productosS:string [] = [];

  //array que contiene los productos para mostrarlos
  productos:any [] = [];

  //arrays que contienen las cantidades y precios del pedido
  cantidades:string [] = [];
  precios:string [] = [];

  //metodo que tiene la funcion de cargar la lista de pedidos al iniciar la ventana
  recargarLista()
  {
    this._productoService.getProductos()
        .subscribe( data=>{
                            if(data != null)
                            {
                              //se llena el arreglo para mostrar los productos.
                              this.productos = data;

                              //variale que contendra la cantidad de productos
                              let x = 0;
                              let ps = "";
                              //metodo para recorrer el arreglo y saber cuantos productos hay
                              for (var i in this.productos) {
                                if(ps == "")
                                    ps = i;
                                else
                                    ps += ","+i;

                                if (this.productos.hasOwnProperty(i)) {
                                    x++;
                                }
                              }

                              this.productosS = ps.split(",");

                              //variables locales para hacer el paso de string a array.
                              let c:string = "";
                              let p:string = "";
                              //metodo para llenar un string el cual contendra
                              //las cantidades de cada producto por eso inicializado en 0
                              for (let i = 0; i < x; i++) {
                                  if(c == "")
                                      c = "0";
                                  else
                                      c +=",0";

                                  if(p == "")
                                      p = "0";
                                  else
                                      p +=",0";
                              }
                              //se hace un array no asociativo del string
                              this.cantidades = c.split(",");
                              this.precios = p.split(",");
                            }
                            else
                              this.nada = true;
                          });
  }

  constructor( private _productoService:ProductoService )
  {
    //se carga la vista de los productos
    this.recargarLista();

    //se crea la instancia de los eventos
    this.detectc = new EventEmitter();
    this.detectp = new EventEmitter();
    this.detectprod = new EventEmitter();
  }

  ngOnInit() {
  }


  //los metodos sumar y restar contienen las mismas lineas,
  // en la linea 2 (relativa) se agrega ++ o -- de acuerdo al caso
  sumar( id:number, precio:string, nombre:string )
  {
    //variable para obtener la cantidad y convertirla a numero para sumar
    let x = Number(this.cantidades[id]);
    //se suma
    x++;
    //se convierte a string y se añade nuevamente la variable a la posicion
    //de donde se obtuvo
    this.cantidades[id] = String(x);
    this.precios[id] = precio;

    //se coloca el nombre del producto en un string.
    this.productosS[id] = nombre;

    //se lanzan los array para tratarlos
    this.detectc.emit(this.cantidades);
    this.detectp.emit(this.precios);
    this.detectprod.emit(this.productosS);
  }

  restar(id:number)
  {
    let x = Number(this.cantidades[id]);
    if(x == 0)
      x = 0;
    else
      x--;

    this.cantidades[id] = String(x);
    this.detectc.emit(this.cantidades);
    this.detectp.emit(this.precios);
  }
}
