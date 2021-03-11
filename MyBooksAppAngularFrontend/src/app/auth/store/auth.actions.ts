import {createAction, props} from '@ngrx/store';

export const signInStart = createAction(
  '[Auth] Sign In Start',
  props<{
    email: string,
    password: string
  }>()
);

export const signUpStart = createAction(
  '[Auth] Sign Up Start',
  props<{
    email: string,
    password: string
  }>()
);

export const authenticateSuccess = createAction(
  '[Auth] Authenticate Success',
  props<{
    email: string,
    userId: string,
    token: string,
    expirationDate: Date,
    redirect: boolean
  }>()
);

export  const authenticateFail = createAction(
  '[Auth] Authenticate Fail',
  props<{
    errorMessage: string
  }>()
);

export const logout = createAction(
  '[Auth] Logout'
);

export const autoSignIn = createAction(
  '[Auth] Auto Sign In'
);

export const clearError = createAction(
  '[Auth] Clear Error'
);
