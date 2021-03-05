import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Author} from './models/author.model';
import {Store} from '@ngrx/store';
import {Actions, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import * as AuthorsActions from './store/authors.actions';

@Injectable({providedIn: 'root'})
export class AuthorsResolverService implements Resolve<Author[]> {

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions) { }

  // @ts-ignore
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('authors').pipe(
      take(1),
      map(authorsState => {
        return authorsState.authors;
      }),
      switchMap(authors => {
        if (authors.length === 0) {
          this.store.dispatch(AuthorsActions.getAuthorsFromDb({searchAuthorQuery: '', currentPage: 1, pageSize: 10}));
          return this.actions$.pipe(
            ofType(AuthorsActions.setAuthors),
            take(1)
          );
        } else {
          return of(authors);
        }
      })
    );
  }
}
