import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'pageNum'
})
export class PageNumPipe implements PipeTransform {
  transform(pages:number): any {
    if(pages) {
      return pages;
    } else {
      return "No info";
    }
  }
}
@Pipe({
  name: 'genre'
})
export class GenrePipe implements PipeTransform {
  transform(genre:string): any {
    if(genre) {
      return genre.charAt(0) + genre.slice(1).toLocaleLowerCase();
    } else {
      return "No info";
    }
  }
}
