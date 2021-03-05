import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Author} from '../models/author.model';
import * as fromApp from '../../store/app.reducer';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-author-not-selected',
  templateUrl: './author-not-selected.component.html',
  styleUrls: ['./author-not-selected.component.css']
})
export class AuthorNotSelectedComponent implements OnInit, OnDestroy {
  authors: Author[];
  private authSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.authSub = this.store.select('authors').pipe(
      map(authorsState => authorsState.authors)
    ).subscribe(authors => this.authors = authors);
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
