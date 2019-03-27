import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
//   pure: false // pipe will rerun when anything changes on the page
})
export class FilterPipe implements PipeTransform {

    transform(value: any, filterText: string, propName: string): any {
        if(value && value.length === 0 || filterText === '') {
            return value;
        };
        return value.filter(item => {
            return item[propName].toLowerCase().includes(filterText.toLowerCase());
        });
    };
};
