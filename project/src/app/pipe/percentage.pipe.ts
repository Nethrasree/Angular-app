import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../environment';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

  transform(value: number): number {
    return value * (environment.numberfive/environment.numberten); // Reduce the value to 50% (half)
  }

}
