import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BooksComponent} from './books.component';
import {BooksRoutingModule} from './books-routing.module';
import {MatInputModule} from '@angular/material/input';
import {BookItemComponent} from './book-item/book-item.component';
import {BookListComponent} from './book-list/book-list.component';



@NgModule({
  declarations: [
    BooksComponent,
    BookItemComponent,
    BookListComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatInputModule,
  ]
})
export class BooksModule { }
