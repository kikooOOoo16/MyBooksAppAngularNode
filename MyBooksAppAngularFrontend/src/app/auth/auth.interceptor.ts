import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {exhaustMap, map, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private store: Store<fromApp.AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        if (authState.user) {
          return authState.user.token;
        } else {
          return next.handle(req);
        }
      }),
      exhaustMap(token => {
        if (token !== '' && token !== undefined) {
          const authRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
            // set only adds new headers doesn't overwrites unless the header already exists
          });
          return next.handle(authRequest);
        }
        return next.handle(req);
      })
    );
  }
}
