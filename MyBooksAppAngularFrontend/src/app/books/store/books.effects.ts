import {Book} from '../models/book.model';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import * as BooksActions from './books.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

interface ResDataGetBooks {
  books: Book[];
  message: string;
}

@Injectable()
export class BooksEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  getBooksFromDb$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.getBooksFromDb),
      switchMap(actionData => {
        let queryParams = '';
        if (actionData.searchBy === 'title') {
          queryParams = `?searchBooksByTitleQuery=${actionData.searchBookQuery}`;
        } else if (actionData.searchBy === 'series') {
          queryParams = `?searchBooksBySeriesQuery=${actionData.searchBookQuery}`;
        }
        return this.http.get<ResDataGetBooks>('http://localhost:3000/books' + queryParams)
          .pipe(
            map(resData => {
              return {
                books: resData.books
              };
            }),
            map(result => {
              return BooksActions.setBooks({books: result.books});
            }),
            catchError(err =>
              of(BooksActions.noBooksInDb())
            )
          );
      })
    )
  );
}
