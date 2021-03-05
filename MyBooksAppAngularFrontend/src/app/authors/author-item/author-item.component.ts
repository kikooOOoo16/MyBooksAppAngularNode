import {Component, Input, OnInit} from '@angular/core';
import {Author} from '../models/author.model';

@Component({
  selector: 'app-author-item',
  templateUrl: './author-item.component.html',
  styleUrls: ['./author-item.component.css']
})
export class AuthorItemComponent implements OnInit {
  @Input() authorItem: Author;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
