import {Component, OnDestroy, OnInit} from '@angular/core';
import {Author} from '../models/author.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import * as AuthorsActions from '../store/authors.actions';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit, OnDestroy {
  authors: Author[];
  isLoading = false;
  numOfAuthors = 0;
  pageSize = 10;
  pageSizeOptions = [1, 2, 5, 10, 15];
  currentPage = 0;
  private storeSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('authors')
      .pipe(
        map(authorsState => {
          return {
            dbCall: authorsState.dbCall,
            authors: authorsState.authors,
            numOfAuthors: authorsState.numOfAuthors
          };
        })
      ).subscribe((
        {
          dbCall,
          authors,
          numOfAuthors
        }) => {
        this.isLoading = dbCall;
        this.numOfAuthors = numOfAuthors;
        this.authors = authors;
      });
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }

  authorSearch(searchAuthorInput: HTMLInputElement) {
    if (searchAuthorInput.value) {
      this.store.dispatch(AuthorsActions.startAuthorsDbCall());
      this.store.dispatch(AuthorsActions.getAuthorsFromDb(
        {
          searchAuthorQuery: searchAuthorInput.value,
          pageSize: -1,
          currentPage: -1
        }));
      this.router.navigate(['/authors']);
    } else {
      this.store.dispatch(AuthorsActions.startAuthorsDbCall());
      this.store.dispatch(AuthorsActions.getAuthorsFromDb({
        searchAuthorQuery: '',
        pageSize: this.pageSize,
        currentPage: 1
      }));
      this.router.navigate(['/authors']);
    }
  }

  onChangedPage($event: PageEvent): void {
    this.isLoading = true;
    this.currentPage = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.store.dispatch(AuthorsActions.startAuthorsDbCall());
    this.store.dispatch(AuthorsActions.getAuthorsFromDb(
      {
        searchAuthorQuery: '',
        pageSize: this.pageSize,
        currentPage: this.currentPage + 1
      }
    ));
    this.router.navigate(['/authors']);
  }
}
