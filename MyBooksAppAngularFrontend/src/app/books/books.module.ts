import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksComponent} from './books.component';
import {BooksRoutingModule} from './books-routing.module';
import {BookItemComponent} from './book-item/book-item.component';
import {BookListComponent} from './book-list/book-list.component';
import {AngularMaterialModule} from '../ng-material/ng-material.module';
import {GoTopButtonModule} from 'ng-go-top-button';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    BooksComponent,
    BookItemComponent,
    BookListComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    AngularMaterialModule,
    GoTopButtonModule,
    FontAwesomeModule
  ]
})
export class BooksModule { }
