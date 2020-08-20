import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbvTitle'
})
export class AbbvTitlePipe implements PipeTransform {

  transform(value: string): string {
    if (value.length < 28) return value;
    else return value.substr(0, 24) + "...";
  }

}
