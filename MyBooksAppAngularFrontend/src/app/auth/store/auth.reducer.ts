import {User} from '../models/user.model';
import {Action, createReducer, on} from '@ngrx/store';
import * as AuthActions from './auth.actions';
import {Book} from '../../books/models/book.model';

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
      loading: true
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
      authError: null,
      loading: false
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
    AuthActions.addBookToUserList,
    (state, action) => {
      const currentUserData: User = {...state.user};
      const currentUserBooks = [...state.user.booksList];
      if (currentUserBooks.filter((book => book.title === action.book.title)).length > 0) {
        return {
          ...state
        };
      }
      currentUserBooks.push({...action.book});
      currentUserData.booksList = [...currentUserBooks];
      return {
        ...state,
        user: {...currentUserData}
      };
    }
  ),
  on(
    AuthActions.updateUserBookListStatus,
    (state, action) => {
      const currentUserData: User = {...state.user};
      const bookToUpdateIndex = state.user.booksList.findIndex(book => action.book.title === book.title);
      const updatedBook: Book = {
        ...state.user.booksList[bookToUpdateIndex],
        bookStatus: action.status
      };
      const updatedBooks = [...state.user.booksList];
      updatedBooks[bookToUpdateIndex] = updatedBook;
      currentUserData.booksList = updatedBooks;
      return {
        ...state,
        user: {...currentUserData}
      };
    }
  ),
  on(
    AuthActions.removeBookFromUserList,
    (state, action) => {
      const currentUserData: User = {...state.user};
      const updatedBooks: Book[] = [...state.user.booksList.filter(book => book.title !== action.book.title)];
      currentUserData.booksList = [...updatedBooks];
      return {
        ...state,
        user: { ...currentUserData }
      };
    }
  ),
  on(
    AuthActions.setUserBookList,
    (state, action) => {
      const currentUserData: User = {...state.user};
      currentUserData.booksList = [...action.books];
      return {
        ...state,
        user: { ...currentUserData }
      };
    }
  ),
  on(
    AuthActions.clearError,
    (state) => ({
      ...state,
      authError: null,
      loading: false
    })
  )
);

export function authReducer(state = initialState, action: Action) {
  return _authReducer(state, action);
}

