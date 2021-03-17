import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  authForm: FormGroup;
  isSignInMode = true;
  isLoading = false;
  private authSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    this.authSub = this.store.select('auth').pipe(
      map(authState => {
        return authState.loading;
      })
    ).subscribe(loadingState => {
      this.isLoading = loadingState;
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  authFormSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;
    if (this.isSignInMode) {
      this.store.dispatch(AuthActions.signInStart({email, password}));
    } else {
      this.store.dispatch(AuthActions.signUpStart({email, password}));
    }

    this.authForm.reset();
  }

  onSwitchMode() {
    this.isSignInMode = !this.isSignInMode;
  }
}
