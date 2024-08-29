import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanString',
  standalone: true
})
export class BooleanStringPipe implements PipeTransform {

  transform(value: boolean): string {
    return value?"Sim":"Não";
  }

}
