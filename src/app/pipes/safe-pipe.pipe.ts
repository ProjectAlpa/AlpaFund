import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safePipe'
})
export class SafePipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
