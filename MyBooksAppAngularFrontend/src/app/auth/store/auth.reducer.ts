import {User} from '../models/user.model';
import {Action, createReducer, on} from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

// tslint:disable-next-line:variable-name
const _authReducer = createReducer(
  initialState,
  on(
    AuthActions.signInStart,
    AuthActions.signUpStart,
    (state => ({
      ...state,
      authError: null,
      loading: false
    }))
  ),
  on(
    AuthActions.authenticateSuccess,
    (state, action) => ({
      ...state,
      user: new User(
        action.email,
        action.userId,
        action.token,
        action.expirationDate
      ),
      authError: null
    })
  ),
  on(
    AuthActions.logout,
    (state) => {
      localStorage.removeItem('userData');
      return {
        ...state,
        user: null,
        loading: false
      };
    }
  ),
  on(
    AuthActions.clearError,
    (state) => ({
      ...state,
      authError: null
    })
  )
);

export function authReducer(state = initialState, action: Action) {
  return _authReducer(state, action);
}

