import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Book} from '../models/book.model';
import * as BooksActions from '../store/books.actions';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  @ViewChild('searchBooksByNameField') searchBooksByTitleField: ElementRef;
  @ViewChild('searchBooksBySeriesField') searchBooksBySeriesField: ElementRef;
  searchBy: string;
  books: Book[];
  isLoading = true;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('books')
      .pipe(
        map(bookState => {
          return {
            books: bookState.books,
            dbCall: bookState.dbCall
          };
        })
      ).subscribe(resData => {
      this.books = resData.books;
      this.isLoading = resData.dbCall;
      }
    );
  }

  bookSearch(searchField: HTMLInputElement, searchBy: string) {
    const searchQuery = searchField.value;
    if (searchBy === 'title') {
      this.searchBooksBySeriesField.nativeElement.value = '';
    } else {
      this.searchBooksByTitleField.nativeElement.value = '';
    }

    this.store.dispatch(BooksActions.getBooksFromDb({searchBookQuery: searchQuery, searchBy}));
    return;
  }
}
