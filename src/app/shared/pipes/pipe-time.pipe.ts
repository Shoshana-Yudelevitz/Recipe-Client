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
       if(minutes===0)
        {
          if(hours===1){
            return `זמן הכנה: שעה `
          }
          if(hours===2){
            return `זמן הכנה: שעתיים `
          }
          return `זמן הכנה: ${hours} שעות`
        }
        if(hours===1){
          return `זמן הכנה: שעה ו ${minutes} דקות`
        }
        if(hours===2){
          return `זמן הכנה: שעתיים ו ${minutes} דקות`
        }
      return `זמן הכנה: ${hours} שעות ו-${minutes} דקות`;
  
  }

}
