import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from "../../../../interfaces/producto.interface";
import { ProductoService } from "../../../../servicios/producto.service";

@Component({
  selector: 'app-modify-ped',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {

  mm:any[] = [];
  cc:any[] = [];
  m:string = "no hay";
  c:string = "0.00";
  cargadom:boolean = false;
  cargadoc:boolean = false;

  private producto:Producto = {
    nombre: "",
    descripcion: "",
    materiales: "",
    cantidades: "",
    precio: "",
    posible: ""
  }

  @Input('k') key:string;

  @Output() detect:EventEmitter<any>;

  constructor( private _productoService:ProductoService )
  {
    this.detect = new EventEmitter();
  }

  ngOnInit()
  {
    this.cargar();
  }


  cargar()
  {
    this._productoService.getProducto(this.key).subscribe( data => {
                                                                      if( data != null){
                                                                        this.producto = data;
                                                                        this.m = this.producto.materiales;
                                                                        this.c = this.producto.cantidades;
                                                                        this.convertirMC(this.producto.materiales,this.producto.cantidades);
                                                                      }
                                                                      else{
                                                                        this.producto.nombre = "Error";
                                                                        this.producto.descripcion = "Error";
                                                                        this.producto.materiales = "Error,Error";
                                                                        this.producto.cantidades = "Error,Error";
                                                                        this.producto.precio = "0";
                                                                      }
                                                                    });
  }

  guardar()
  {
    this._productoService.modificarProducto( this.producto, this.key )
        .subscribe(data=>{  if (data != null) this.detect.emit(data); });
  }

  convertirMC(m:string,c:string)
  {
    this.mm = m.split(",");
    this.cc = c.split(",");
  }

  cargarStringm( cadena:string )
  {
    this.producto.materiales = cadena;
    this.revisar();
  }

  cargarStringc( cadena:string )
  {
    this.producto.cantidades = cadena;
    this.revisar();
  }

  revisar()
  {
    if(this.producto.materiales != "")
        this.cargadom = true;

    if(this.producto.cantidades != "")
        this.cargadoc = true;
  }
}
