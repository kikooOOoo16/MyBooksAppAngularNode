export enum BookStatus {
  Reading = 'Reading',
  Read = 'Read',
  WantToRead = 'Want To Read'
}
export class Book {
  // tslint:disable-next-line:variable-name
  _id: string;
  title: string;
  year: Date;
  series: string;
  seriesIndex: number;
  authorName: string;
  bookStatus: BookStatus;
}
