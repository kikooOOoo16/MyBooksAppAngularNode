import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Book} from '../books/models/book.model';
import {Store} from '@ngrx/store';
import {map, switchMap, take} from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import {Actions, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ProfileBooksListResolverService implements Resolve<Book[]> {

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {
  }

  // @ts-ignore
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user.booksList;
      }),
      switchMap(booksList => {
        if (booksList.length === 0) {
          this.store.dispatch(AuthActions.getUserBookListFromDB());
          return this.actions$.pipe(
            ofType(AuthActions.setUserBookList),
            take(1)
          );
        } else {
          return of(booksList);
        }
      })
    );
  }

}
