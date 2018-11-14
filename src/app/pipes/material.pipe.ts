import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'material',
  pure: false
})
export class MaterialPipe implements PipeTransform {

  transform(value: any): any {
    let materiales = [];
    for(let material in value)
    {
      materiales.push(material);
    }
    return materiales;
  }

}
