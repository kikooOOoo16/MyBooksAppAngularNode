import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import * as AuthorsActions from './authors.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Author} from '../models/author.model';
import {of} from 'rxjs';

interface ResDataGetAuthors {
  message: string;
  authors: Author[];
  numOfAuthors: number;
}

interface ResDataGetAuthor {
  message: string;
  author: Author;
}

@Injectable()
export class AuthorsEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  getAuthorsFromDb$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthorsActions.getAuthorsFromDb),
      switchMap(actionData => {
        // setup query params based on passed actionData
        let queryParams = '';
        if (actionData.searchAuthorQuery !== '') {
          queryParams = `?searchAuthorQuery=${actionData.searchAuthorQuery}`;
        } else if (actionData.currentPage > 0 && actionData.pageSize > 0) {
          queryParams = `?pageSize=${actionData.pageSize}&page=${actionData.currentPage}`;
          console.log(queryParams);
        }
        return this.http.get<ResDataGetAuthors>('http://localhost:3000/authors' + queryParams)
          .pipe(
            map(resData => {
              return {
                authors: resData.authors,
                numOfAuthors: resData.numOfAuthors ? +resData.numOfAuthors : -1
              };
            }),
            map(result => {
              return AuthorsActions.setAuthors({
                authors: result.authors as Author[],
                numOfAuthors: result.numOfAuthors
              });
            }), catchError(err =>
              of(AuthorsActions.noAuthorsInDb())
            )
          );
      })
    ));

  getAuthorFromDb$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthorsActions.getAuthorFromDb),
      switchMap((actionData => {
        if (!actionData.id.match(/^[0-9a-fA-F]{24}$/)) {
          throw  new Error('Not an author id');
        }
        return this.http.get<ResDataGetAuthor>('http://localhost:3000/authors/' + actionData.id)
          .pipe(
            map(resData => {
              return {
                ...resData.author
              };
            }),
            map(author => {
              return AuthorsActions.setAuthor({author: author as Author});
            }), catchError(err =>
              of(AuthorsActions.noAuthorsInDb()))
          );
        })
      ))
  );

  noAuthorsInDb$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthorsActions.noAuthorsInDb),
      map(() => {
        const emptyAuthors: Author[] = [];
        return AuthorsActions.setAuthors({authors: emptyAuthors, numOfAuthors: -1});
      })
    )
  );
}
