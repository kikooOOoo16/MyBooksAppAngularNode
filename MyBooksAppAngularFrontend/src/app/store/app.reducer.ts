import * as fromAuthor from '../authors/store/authors.reducer';
import * as fromBook from '../books/store/books.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  authors: fromAuthor.State;
  books: fromBook.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  authors: fromAuthor.authorsReducer,
  books: fromBook.booksReducer
};
