import {Component, OnDestroy, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  userEmail = '';

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.authSub = this.store.select('auth').pipe(
      map(authState => {
        return authState.user;
      }),
      map(user => {
        if (user) {
          return user.email;
        }
      })
    ).subscribe(userEmail => this.userEmail = userEmail);
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

}
