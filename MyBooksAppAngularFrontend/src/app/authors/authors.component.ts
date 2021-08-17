import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AuthorsComponent implements OnInit {
  faAngleUp = faAngleUp;
  constructor() { }

  ngOnInit(): void {
  }

}
