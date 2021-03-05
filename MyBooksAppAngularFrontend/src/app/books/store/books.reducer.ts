import {Book} from '../models/book.model';
import {Action, createReducer, on} from '@ngrx/store';
import * as BooksActions from './books.actions';

export interface State {
  books: Book[];
  dbCall: boolean;
}

const initialState: State = {
  books: [],
  dbCall: false,
};

// tslint:disable-next-line:variable-name
const _booksReducer = createReducer(
  initialState,
  on(
    BooksActions.startBooksDbCall,
    (state, action) => ({
      ...state,
      dbCall: true
    })
  ),
  on(
    BooksActions.setBooks,
    (state, action) => ({
      books: [...action.books],
      dbCall: false
    })
  )
);

export function booksReducer(state: State = initialState, action: Action) {
  return _booksReducer(state, action);
}
