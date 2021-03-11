import * as fromAuthor from '../authors/store/authors.reducer';
import * as fromBook from '../books/store/books.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  authors: fromAuthor.State;
  books: fromBook.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  authors: fromAuthor.authorsReducer,
  books: fromBook.booksReducer,
  auth: fromAuth.authReducer
};
