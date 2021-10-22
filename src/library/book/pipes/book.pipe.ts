import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pageNum'
})
export class PageNumPipe implements PipeTransform {

  transform(pages: number): any {
    return pages ? pages : "No info";
  }
}

@Pipe({
  name: 'genre'
})
export class GenrePipe implements PipeTransform {
  
  transform(genre: string): string {
    if (genre) {
      return genre.charAt(0) + genre.slice(1).toLocaleLowerCase();
    }
    return "No info";
  }
}
