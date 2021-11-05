import {Pipe, PipeTransform} from '@angular/core';

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
@Pipe({
  name: 'authorFilter'
})
export class AuthorPipe implements PipeTransform {

  transform(authors: any[], searchText: string):any[] {
    if (!authors) {
      return authors;
    }
    if (!searchText) {
      return authors;
    }
    searchText = searchText.toLocaleLowerCase();
    let filtered = authors.filter(item => {
      return item.getFirstName().toLocaleLowerCase().includes(searchText)
    });
    return filtered;
  }
}
