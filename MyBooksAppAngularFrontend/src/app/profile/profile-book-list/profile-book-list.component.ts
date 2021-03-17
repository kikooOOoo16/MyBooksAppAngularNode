import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {Book, BookStatus} from '../../books/models/book.model';
import {map} from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-book-list',
  templateUrl: './profile-book-list.component.html',
  styleUrls: ['./profile-book-list.component.css']
})
export class ProfileBookListComponent implements OnInit {
  private authSub: Subscription;
  userBooksList: Book[] = [];
  filteredBooksList: Book[] = [];
  booksStatus = BookStatus;
  trash = faTrashAlt;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.authSub = this.store.select('auth').pipe(
      map(authState => {
        return authState.user;
      }),
      map(user => {
        if (user) {
          return user.booksList;
        }
      })
    ).subscribe(books => {
      this.userBooksList = books;
      this.filteredBooksList = [...this.userBooksList];
    });
  }

  booksStatuses() {
    return Object.keys(this.booksStatus).filter(
      (type) => isNaN(type as any) && type !== 'values'
    );
  }

  changeBookStatus(book: Book, status: BookStatus) {
    this.store.dispatch(AuthActions.updateUserBookListStatus({book, status}));
  }

  removeBookFromList(book: Book) {
    this.store.dispatch(AuthActions.removeBookFromUserList({book}));
  }

  filterTable(filterBy: string) {
    if (filterBy === 'All') {
      return this.filteredBooksList = [...this.userBooksList];
    }
    return this.filteredBooksList = [...this.userBooksList.filter(book => book.bookStatus === filterBy)];
  }

}
