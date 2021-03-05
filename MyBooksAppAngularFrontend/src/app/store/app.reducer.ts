import * as fromAuthor from '../authors/store/authors.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  authors: fromAuthor.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  authors: fromAuthor.authorsReducer
};
