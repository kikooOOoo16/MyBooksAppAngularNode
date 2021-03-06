import {Component, Input, OnInit} from '@angular/core';
import {Author} from '../models/author.model';
import {ScrollService} from '../../shared/scroll.service';

@Component({
  selector: 'app-author-item',
  templateUrl: './author-item.component.html',
  styleUrls: ['./author-item.component.css']
})
export class AuthorItemComponent implements OnInit {
  @Input() authorItem: Author;

  constructor(private scrollService: ScrollService) { }

  ngOnInit(): void {
  }

  scrollToId(id: string) {
    console.log('element id : ', id);
    this.scrollService.scrollToElementById(id);
  }

}
