import {createAction, props} from '@ngrx/store';
import {Book, BookStatus} from '../../books/models/book.model';

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

export const addBookToUserList = createAction(
  '[Auth] Add Book To User List',
  props<{
    book: Book
  }>()
);

export const updateUserBookListStatus = createAction(
  '[Auth] Update User List Book Status',
  props<{
    book: Book,
    status: BookStatus
  }>()
);

export const removeBookFromUserList = createAction(
  '[Auth] Remove Book From User List',
  props<{book: Book}>()
);

export const getUserBookListFromDB = createAction(
  '[Auth] Get User Books List From DB'
);

export const setUserBookList = createAction(
  '[Auth] Set User Book List',
  props<{
    books: Book[]
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
