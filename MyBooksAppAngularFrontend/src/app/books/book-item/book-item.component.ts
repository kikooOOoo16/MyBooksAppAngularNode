import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../models/book.model';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {
  @Input() bookItem: Book;

  constructor() { }

  ngOnInit(): void {
  }

}
