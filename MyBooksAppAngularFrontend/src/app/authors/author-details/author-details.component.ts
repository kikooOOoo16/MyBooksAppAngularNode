import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Author} from '../models/author.model';
import {map, take} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {Book} from '../../books/models/book.model';
import * as AuthorActions from '../store/authors.actions';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit, OnDestroy {
  id: string;
  author: Author;
  isAuth = false;
  private authorSub: Subscription;
  private authSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.store.dispatch(AuthorActions.getAuthorFromDb({id: this.id}));
    });

    this.authorSub = this.store.select('authors').pipe(
      map(authorsState => authorsState.authors
        .filter(author => author.id === this.id))
    ).subscribe(author => {
      if (author) {
        this.author = author[0];
      }
    });

    this.authSub = this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      })
    ).subscribe(user => {
      this.isAuth = !!user;
    });
  }

  ngOnDestroy(): void {
    this.authorSub.unsubscribe();
    this.authSub.unsubscribe();
  }

  addBookToUserList(book: Book) {
    this.store.dispatch(AuthActions.addBookToUserList({book}));
  }
}
