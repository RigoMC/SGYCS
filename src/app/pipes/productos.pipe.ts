import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productos',
  pure: false
})
export class ProductosPipe implements PipeTransform {

  transform(value: any): any {
    let productos = [];
    for(let producto in value)
    {
      productos.push(producto);
    }
    return productos;
  }

}
