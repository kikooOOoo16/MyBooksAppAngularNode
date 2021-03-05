import {createAction, props} from '@ngrx/store';
import {Author} from '../models/author.model';

export const getAuthorsFromDb = createAction(
  '[Authors] Get Authors From Db',
  props<{
    searchAuthorQuery: string,
    pageSize: number,
    currentPage: number
  }>()
);

export const getAuthorFromDb = createAction(
  '[Authors] Get Single Author From Db',
  props<{id: string}>()
);

export const noAuthorsInDb = createAction(
  '[Authors] No Authors In Db'
);

export const startAuthorsDbCall = createAction(
  '[Authors] Start Database Call'
);

export const setAuthors = createAction(
  '[Authors] Set Authors',
  props<{
    authors: Author[],
    numOfAuthors: number
  }>()
);

export const setAuthor = createAction(
  '[Authors] Set Single Author',
  props<{author: Author}>()
);
