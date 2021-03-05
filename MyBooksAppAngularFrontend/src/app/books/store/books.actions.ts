import {createAction, props} from '@ngrx/store';
import {Book} from '../models/book.model';

export const getBooksFromDb = createAction(
  '[Books] Get Books From Db',
  props<{
    searchBookQuery: string,
    searchBy: string
  }>()
);

export const noBooksInDb = createAction(
  '[Books] No Books In Db'
);

export const startBooksDbCall = createAction(
  '[Books] Start Database Call'
);

export const setBooks = createAction(
  '[Books] Set Books',
  props<{
    books: Book[],
  }>()
);
