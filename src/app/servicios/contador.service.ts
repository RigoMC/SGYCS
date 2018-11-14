import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';

//importaciones del servicio.
import { ProductoService } from "./producto.service";
import { MaterialService } from "./material.service";

@Injectable()
export class ContadorService {

  //variables generales.
  private productos:any [] = []; //Arreglo que recibe todos los productos existentes en el momento de la ejecucion.
  private materiales:any [] = []; //Arreglo que recibe todos los materiales que existen en el momento de la ejecucion.

  //creo una instancia de los servicios que me permitiran obtener los datos necesarios
  constructor( private _productoService:ProductoService, private _materialService:MaterialService )
  {
    this.rpm();
  }

  rpm()
  {
    this._productoService.getProductos().subscribe( data => { this.productos = data; });//obtengo los productos.
    this._materialService.getMateriales().subscribe( data => { this.materiales = data; });//obtengo los materiales.
  }

  rpM()
  {
    this._productoService.getProductos().subscribe( data => { this.productos = data; });//obtengo los productos.
    this._materialService.getMateriales().subscribe( data => { this.materiales = data; });//obtengo los materiales.
  }

  //función que genera una cantidad posible a partir de las cantidadesde varios materiales.(func.Productos).
  public crearPosible( x:string,y:string ):number //x = materiales; y = cantidades[00 xx, 00 xx];
  {
    this.rpm();
    //arreglos de los datos del producto
    let array = x.split(",");//arreglo de las llaves de los materiales
    let arrayC = y.split(",");//arreglos de las cantidades

    //instancia de variables del material en especifico de la bd.
    let cantidadbd = "";
    let unidadbd = "";
    let relacion = "";

    let cantPos:any [] = [];

    for (let i = 0; i < array.length; i++) {
      cantPos[i] = this.compararUnidades(array[i],arrayC[i],0);
    }

    cantPos = cantPos.sort(); //se ordenan las cantidades para obtener la menor.
    return cantPos[0]; //se retorna la cantidad menor.
  }

  //función que permite actualizar la cantidad posible de todos los productos.(func.XXXX).
  public actualizarPosibles():void
  {
    for (let k in this.productos) { //recorro el arreglo de los productos.
      this.productos[k].posible = this.crearPosible(this.productos[k].materiales,this.productos[k].cantidades);//genero el nuevo posible.
      this._productoService.modificarProducto(this.productos[k],k).subscribe(data=>{});//actualizo el producto en bd.
    }
  }

  //función que permite restar una cantidad a la que se posee actualmente de un material en especifico
  private restarMateriales( keysMat:string,cantsRest:string ):void //keysMat = llaves del nodo; cantsRest = cantidades a restar[00 xx];
  {
    this.rpm();
    let arrayK = keysMat.split(","); //arreglo de llaves.
    let arrayC = cantsRest.split(","); //arreglo de cantidades.

    for (let i = 0; i < arrayK.length; i++) {

        let cant = this.compararUnidades( arrayK[i],arrayC[i],1 );

        this.materiales[arrayK[i]].cantidad = cant;

        this._materialService.modificarMaterial( this.materiales[arrayK[i]],arrayK[i] ).subscribe(data=>{});

    }

    this.actualizarPosibles();
  }


  private compararUnidades( x:string,cant:string,tp:number ):number //x = llave del nodo; cant = cantidad formato[00 xx]; tp = tipo de operacion;
  {
    if (this.materiales[x] != null) { //se compara para saber si el material existe.

      //se obtienen los datos del material de la bd.
      let cantidadbd = this.materiales[x].cantidad;
      let unidadbd = this.materiales[x].unidad;
      let relacion = this.materiales[x].relacion;


      let cantidad = cant.split(" "); //arreglo con posiciones 0 y 1 donde: [00,xx];

      let c = cantidad[0];//se saca la cantidad del arreglo.
      let u = cantidad[1];//se saca la unidad del arreglo.

      let result = 0;//variable que almacenara la cantidad posible del material actual.

      if(relacion != "")//si existe la relacion
      {
        result = Number(cantidadbd)*Number(relacion);//se realiza la conversion por unidad.
        if(u == "Pz")//se compara con pz porque es la unica unidad que debe tener relacion.
        {
            if (tp == 0)
              result = Number(result)/Number(c);//se asigna.
            else
              result = (Number(result)-Number(c))/Number(relacion);//se asigna.

        }else{
          alert("ERROR type: upz0");//si la unidad no coincide se lanza una alerta con el error upz0.
        }
      }
      else //si la relacion no existe se continua con la comparacion de unidades.
      {
        if(u == unidadbd)//si son iguales...
        {
          if (tp == 0)
            result = Number(cantidadbd)/Number(c);//se asigna.
          else
            result = (Number(cantidadbd)-Number(c));//se asigna.
        }
        else
        {
          if (unidadbd == "Kg"){ //si la unidad es Kg del material es kg, la unidad del producto debe ser gr.
              if(u == "Gr")//se compara que la unidad sea gr.
              {
                cantidadbd = String(Number(cantidadbd)*1000);//se realiza la conversion de gr a kg.

                if (tp == 0)
                  result = Number(cantidadbd)/Number(c);//se asigna.
                else
                  result = (Number(cantidadbd)-Number(c))/1000;//se asigna.
              }
              else
              {
                alert("ERROR type: ukg0");//si la unidad no es gr, se lanza una alerta con el error ukg0.
              }
          }
          else{
            alert("ERROR type: une0");//si la unidad no es kg se lanza la alerta une0 (uNIDAD nO eXISTE).
          }
        }
      }

      return result; //retorno el resultdo de la operacion correspondiente, en caso de no entrar retorna 0.

    }
    else{
      alert("ERROR type: mne0"); //alerta que lanza el error mne0 (mATERIAL nO eXISTE).
    }
  }

  //función que permite obtener los materiales y convertir las cantidades.
  public restarProductos( x:string,y:string ):void //x = cadena con llaves de productos; y = cadena con la cantidad comprada.
  {
      this.rpm();

      let arrayKP = x.split(","); // se genera un arreglo con llaves de productos.
      let arrayCC = y.split(","); //se genera un arreglo con las cantidades compradas.

      for (let i = 0; i < arrayKP.length; i++) { //se recorren loa arreglos KP y CC
          let keyProd = arrayKP[i]; //se obtiene la llave de un producto.

          if (Number(arrayCC[i]) != 0) { //se compara si hay compra.

            let arrayM = this.productos[keyProd].materiales.split(","); //se obtienen las llaves de los materiales.
            let arrayCM = this.productos[keyProd].cantidades.split(","); //se obtienen las cantidades usadas por el producto.

            for (let j = 0; j < arrayM.length; j++) { //recorro los arreglos M y CM.
                let cantidad = arrayCM[j].split(" "); //separo cantidad en [00,xx].
                cantidad[0] = Number(cantidad[0])*Number(arrayCC[i]); //multiplico la cantidad usada por la cantidad comprada.
                arrayCM[j] = cantidad[0]+" "+cantidad[1]; //regreso al formato [00 xx].
            }

            console.log(this.productos[keyProd].materiales);
            console.log(String(arrayCM));
            this.restarMateriales( this.productos[keyProd].materiales,String(arrayCM));
          }

       }
  }


}
