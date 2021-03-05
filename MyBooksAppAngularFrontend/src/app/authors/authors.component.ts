import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit, OnDestroy {
  isLoading = true;
  private authorsSub: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.authorsSub = this.store.select('authors')
      .pipe(
        map(authorState => authorState.dbCall)
      ).subscribe(dbCall => {
        this.isLoading = dbCall;
      });
  }

  ngOnDestroy(): void {
    this.authorsSub.unsubscribe();
  }

}
