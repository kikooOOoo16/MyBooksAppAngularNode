import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BooksComponent implements OnInit {
  faAngleUp = faAngleUp;

  constructor() { }

  ngOnInit(): void {
  }
}
