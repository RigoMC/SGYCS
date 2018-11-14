import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comanda',
  pure: false
})
export class ComandaPipe implements PipeTransform {

  transform(value: any): any {
    let comandas = [];
    for(let comanda in value)
    {
      comandas.push(comanda);
    }
    return comandas;
  }

}
