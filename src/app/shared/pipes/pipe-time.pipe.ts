import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeTime',
  standalone: true
})
export class PipeTimePipe implements PipeTransform {

  transform(value: number|undefined): string {
       if (!value) return '';
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      console.log(` ${hours} שעות ו- ${minutes} דקות`);
       if(hours===0){
        return `זמן הכנה: ${minutes} דקות`;
       }

      return `זמן הכנה: ${hours} שעות ו-${minutes} דקות`;
  
  }

}
