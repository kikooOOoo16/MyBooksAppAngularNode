import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileHeaderComponent} from './profile-header/profile-header.component';
import {ProfileBookListComponent} from './profile-book-list/profile-book-list.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileHeaderComponent,
    ProfileBookListComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgbDropdownModule,
    FontAwesomeModule
  ]
})
export class ProfileModule { }
