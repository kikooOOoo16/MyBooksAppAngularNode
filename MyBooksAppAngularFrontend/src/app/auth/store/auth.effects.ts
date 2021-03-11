import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import {map, switchMap, tap} from 'rxjs/operators';
import {AuthService} from '../auth.service';
import {User} from '../models/user.model';

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
    private authService: AuthService
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
          _token: string,
          _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
          return {type: 'AUTOLOGINDUMMY'};
        }
        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);
          return AuthActions.authenticateSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
            redirect: false
          });
        }
        return {type: 'AUTOLOGINDUMMY'};
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
