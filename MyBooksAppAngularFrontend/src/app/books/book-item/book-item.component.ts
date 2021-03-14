import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../models/book.model';
import {Subscription} from 'rxjs';
import * as AuthActions from '../../auth/store/auth.actions';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {
  @Input() bookItem: Book;
  isAuth = false;
  private authSub: Subscription;
  id: string;

  constructor(
    private store: Store<fromApp.AppState>,

  ) { }

  ngOnInit(): void {
    this.authSub = this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      })
    ).subscribe(user => {
      this.isAuth = !!user;
    });
  }

  addBookToUserList(book: Book) {
    this.store.dispatch(AuthActions.addBookToUserList({book}));
  }
}
