import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {AuthService} from '../auth.service';
import {User} from '../models/user.model';
import {Store} from '@ngrx/store';
import * as AuthActions from './auth.actions';
import * as fromApp from '../../store/app.reducer';
import {Book, BookStatus} from '../../books/models/book.model';

export interface AuthResponseData {
  message: string;
  token: string;
  email: string;
  userId: string;
  expiresIn: string;
}

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {
  }

  authSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpStart),
      switchMap(action => {
        return this.http.post<AuthResponseData>('http://localhost:3000/auth/signup', {
          email: action.email,
          password: action.password
        }).pipe(
          map(resData => {
            return AuthActions.signInStart({email: action.email, password: action.password});
          })
          // catchError(error => {
          //   console.log(err);
          // })
        );
      })
    )
  );

  authSignIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signInStart),
      switchMap(action => {
        return this.http.post<AuthResponseData>('http://localhost:3000/auth/signin',
          {
            email: action.email,
            password: action.password
          }
        ).pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return this.handleAuthentication(resData);
          })
        );
      })
    )
  );

  authRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authenticateSuccess),
      tap(action => {
        if (action.redirect) {
          this.router.navigate(['/']);
        }
      })
    ), {dispatch: false} // won't yield a dispatchable action
  );

  autoSignIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoSignIn),
      map(() => {
        const userData: {
          email: string,
          id: string,
          token: string,
          tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
          return {type: 'AUTOLOGINDUMMY'};
        }
        const loadedUser = new User(
          userData.email,
          userData.id,
          userData.token,
          new Date(userData.tokenExpirationDate)
        );
        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);
          return AuthActions.authenticateSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData.tokenExpirationDate),
            redirect: false
          });
        }
        return {type: 'AUTOLOGINDUMMY'};
      })
    )
  );

  saveUserBooksListToDb$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.addBookToUserList, AuthActions.updateUserBookListStatus, AuthActions.removeBookFromUserList),
      withLatestFrom(this.store.select('auth')),
      switchMap(([actionData, authState]) => {
        return this.http.put(
          `http://localhost:3000/auth/${authState.user.id}`,
          {
            booksList: [...authState.user.booksList.map(book => {
              return {
                id: book._id,
                status: book.bookStatus
              };
            })]
          });
      })
    ), { dispatch: false }
  );

  getUserBooksListFromDb$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUserBookListFromDB),
      withLatestFrom(this.store.select('auth')),
      switchMap(([actionData, authState]) => {
        return this.http.get<{
          booksList: [
            {
              book: Book,
              status: BookStatus
            }
          ],
          message: string
        }>(`http://localhost:3000/auth/${authState.user.id}`)
          .pipe(
            map(resData => {
              let editedReturnedData = [];
              if (resData) {
                editedReturnedData = (resData.booksList.map(resObject => {
                    return {
                      _id: resObject.book._id,
                      title: resObject.book.title,
                      authorName: resObject.book.authorName,
                      year: resObject.book.year,
                      series: resObject.book.series,
                      seriesIndex: resObject.book.seriesIndex,
                      bookStatus: resObject.status
                    };
                  })
                );
                return editedReturnedData;
              }
            }),
            map(editedReturnData => {
              return AuthActions.setUserBookList({books: editedReturnData});
            })
          );
      })
    )
  );

  handleAuthentication  = (resData: AuthResponseData) => {
    const expirationDate = new Date(
      new Date().getTime() + +resData.expiresIn * 1000 // ms to s date time stamp
    );
    const user = new User(resData.email, resData.userId, resData.token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));

    return AuthActions.authenticateSuccess({
      email: resData.email,
      userId: resData.userId,
      token: resData.token,
      expirationDate,
      redirect: true
    });
  }
}
