import {BookModel} from '../../books/models/book.model';

export interface Author {
  id: string;
  name: string;
  books?: BookModel[];
  numOfBooks?: number;
}
