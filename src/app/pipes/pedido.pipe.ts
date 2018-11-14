import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pedido',
  pure: false
})
export class PedidoPipe implements PipeTransform {

  transform(value: any): any {
    let pedido = "";
    for(let ped in value)
    {
      pedido += "||| "+ped+" |||";   
    }
    return pedido;
  }

}
