import {Book} from '../../books/models/book.model';

export interface Author {
  id: string;
  name: string;
  books?: Book[];
  numOfBooks?: number;
}
