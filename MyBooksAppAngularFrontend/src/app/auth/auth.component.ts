import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  isSignInMode = true;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
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
