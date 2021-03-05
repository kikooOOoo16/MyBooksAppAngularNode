import * as AuthorActions from './authors.actions';
import {Author} from '../models/author.model';
import {Action, createReducer, on} from '@ngrx/store';

export interface State {
  authors: Author[];
  dbCall: boolean;
  numOfAuthors: number;
}

const initialState: State = {
  authors: [],
  dbCall: false,
  numOfAuthors: 0
};


// tslint:disable-next-line:variable-name
const _authorsReducer = createReducer(
  initialState,
  on(
    AuthorActions.startAuthorsDbCall,
    (state, action) => ({
      ...state,
      dbCall: true
    })
  ),
  on(
    AuthorActions.setAuthors,
    (state, action) => ({
      ...state,
      authors: [...action.authors],
      dbCall: false,
      numOfAuthors: action.numOfAuthors ? action.numOfAuthors : -1
    })
  ),
  on(
    AuthorActions.setAuthor,
    (state, action) => {
      const updatedAuthors = [...state.authors];
      const authorIndex = updatedAuthors.findIndex(author => author.id === action.author.id);

      updatedAuthors[authorIndex] = {
        ...state.authors[authorIndex],
        ...action.author
      };
      return ({
        ...state,
        authors: updatedAuthors,
        dbCall: false
      });
    })
);

export function authorsReducer(state: State = initialState, action: Action) {
  return _authorsReducer(state, action);
}
