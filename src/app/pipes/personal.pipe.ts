import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personal',
  pure: false
})
export class PersonalPipe implements PipeTransform {

  transform(value: any): any {
    let personales = [];
    for(let personal in value)
    {
      personales.push(personal);
    }
    return personales;
  }

}
