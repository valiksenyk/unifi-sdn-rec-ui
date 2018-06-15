import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name:"toMeter"
})
export class NumberToMeterPipe implements PipeTransform{
  transform(distance: any): number {
    return distance.toFixed(4) * 1000
  }
}
