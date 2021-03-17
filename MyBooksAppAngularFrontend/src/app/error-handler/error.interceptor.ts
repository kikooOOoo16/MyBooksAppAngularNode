import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {catchError} from 'rxjs/operators';
import {ErrorHandlerComponent} from './error-handler.component';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  constructor(
    private dialog: MatDialog,
    private store: Store<fromApp.AppState>
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.error.message) {
          errorMessage = error.error.message;
          this.store.dispatch(AuthActions.clearError());
        }
        this.dialog.open(ErrorHandlerComponent, {data: {message: errorMessage}});
        return throwError(error);
      })
    );
  }
}
